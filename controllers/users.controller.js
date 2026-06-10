const db = require('../db');

const blockUsersWithEmail = async (req, res, next) => {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({message: "Invalid or no emails are sent"});
    }

    try {
        const dbResult = await db.result(`
            UPDATE users SET status = 'blocked' WHERE email = ANY($1)
        `, [emails]);

        return res.status(200).json({
            message: 'Users blocked successfully',
            changedAccountsNumber: dbResult.rowCount
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { blockUsersWithEmail };
