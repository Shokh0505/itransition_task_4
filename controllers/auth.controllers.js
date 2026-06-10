require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.none(
            `INSERT INTO users (first_name, last_name, email, password)
             VALUES ($1, $2, $3, $4)`,
            [first_name, last_name, email, hashedPassword]
        );

        return res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({
                message: "This email has already been registered",
            })
        }

        console.error("Registration failed: ", error);
        return res.status(500).json({message: "Internal server error"})
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    
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
        )

        delete user.password;

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: user
        })
    } catch(error) {
        next(error)
    }   

}

module.exports = {
    register,
    login
}
