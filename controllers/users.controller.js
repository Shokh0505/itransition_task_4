const db = require('../db');

const getUsers = async (req, res, next) => {
    try {
        const users = await db.any(
            `SELECT first_name, last_name, title, email, status, last_login 
             FROM users
             ORDER BY last_login DESC`
        );

        res.status(200).json({message: "Successfully retrieved users", users: users});
    } catch (error) {
        next(error)
    }
}

const blockUsersWithEmail = async (req, res, next) => {
    const { emails } = req.body;

    if (checkEmails(emails)) {
        return res.status(400).json({message: "Invalid or no emails are sent"});
    }

    try {
        const dbResult = await db.result(`
            UPDATE users SET previous_status = status, status = 'blocked'::user_status 
            WHERE email = ANY($1) and status != 'blocked'
        `, [emails]);

        return res.status(200).json({
            message: 'Users blocked successfully',
            changedAccountsNumber: dbResult.rowCount
        });
    } catch (error) {
        next(error);
    }
}

const unblockUsersWithEmail = async (req, res, next) => {
    const { emails } = req.body

    if (checkEmails(emails)) {
        return res.status(400).json({message: "Invalid or no emails are sent"});
    }

    try {
        const dbResult = await db.result(
            `UPDATE users 
             SET status = COALESCE(previous_status, 'unverified')::user_status, previous_status = NULL 
             WHERE email = ANY($1) AND status = 'blocked'`, [emails]
        );

        return res.status(200).json({
            message: "Successfully unblocked",
            changedAccountsNumber: dbResult.rowCount
        })
    } catch (error) {
        next(error);
    }
}

function checkEmails(emails) {
    return !emails || !Array.isArray(emails) || emails.length === 0;
}

module.exports = { blockUsersWithEmail, unblockUsersWithEmail, getUsers };
