const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const email = require('../utils/sendEmail');
const crypto = require('crypto');

const register = async (req, res, next) => {
    const { email: userEmail, first_name, last_name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.tx( async t => {
            const user = await t.one(
                `INSERT INTO users (first_name, last_name, email, password)
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [first_name, last_name, userEmail, hashedPassword]
            );
            
            await sendEmailVerificationToken(t, user.id, userEmail);
        });
        
        return res.status(201).json({ message: "User created successfully. Please check your account to verify your account"});
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({
                message: "This email has already been registered",
            });
        }
        console.error("Registration failed: ", error);
        next(error);
    }
};

const login = async (req, res, next) => {
    let {email, password} = req.body;
    email = email.trim() 
    password = password.trim();

    try {
        const user = await db.oneOrNone(
            `SELECT id, first_name, last_name, email, password FROM users WHERE email = $1`,
            [email]
        );
        
        if (!user) {
            return res.status(401).json({message: "Invalid username or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid username or password"});
        }
        
        const payload = {id: user.id, email: user.email};
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        await db.none(`
            UPDATE users SET last_login = NOW() WHERE email = $1
        `, [email])

        delete user.password;
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            message: 'Login successful',
            user: user
        });
    } catch(error) {
        next(error);
    }   
};

const logout = async(req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
    return res.status(200).json({message: "Log out successful"});
} 

const verifyEmail = async (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({message: "Token is missing or tampered with."});
    }

    try {
        const dbToken = await db.oneOrNone(
            `SELECT user_id, expires_at FROM email_verifications WHERE token = $1`,
            [token]
        );

        if (!dbToken) {
            return res.status(400).json({message: "Invalid token"});
        }

        if (new Date() > dbToken.expires_at) {
            await db.none('DELETE FROM email_verifications WHERE token = $1', [token]);
            
            const user = await db.one('SELECT id, email FROM users WHERE id = $1', [dbToken.user_id]);
            await sendEmailVerificationToken(db, user.id, user.email);
            
            return res.status(400).json({message: "The token was expired. New token has been send to your email"});
        }
        
        const user_status = await db.one('SELECT status FROM users WHERE id = $1', [dbToken.user_id]); 
        if (user_status.status === 'blocked') {
            return res.status(403).send('<p>You have been blocked.</p>')
        }


        await db.tx(async t => {
            await t.none('DELETE FROM email_verifications WHERE token = $1', [token]);
            await t.none("UPDATE users SET status = 'verified' WHERE id = $1", [dbToken.user_id]);
        });
        
        return res.status(200).send("<p>Email has been verified. You can return to the application</p>");
    } catch (error) {
        next(error);
    }
};

async function sendEmailVerificationToken(txClient, userId, targetEmail) {
    const randomToken = crypto.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 3600000);
    
    await txClient.none(
        `INSERT INTO email_verifications (user_id, token, expires_at)
         VALUES ($1, $2, $3)`,
        [userId, randomToken, expires_at]
    );

    await email.sendVerificationEmail(targetEmail, randomToken);
}

module.exports = {
    register,
    login,
    verifyEmail,
    logout,
};
