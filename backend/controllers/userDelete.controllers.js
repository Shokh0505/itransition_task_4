const db = require('../db')

const deleteUsers = async (req, res, next) => {
    const { emails } = req.body;
    
    if (!areEmailsValid(emails)) {
        return res.status(400).json({message: "Invalid input was given"});
    }

    try {
        const result = await db.result(`
            DELETE FROM users WHERE email = ANY($1)
        `, [emails]);

        return res.status(200).json({message: 'Users deleted successfully', count: result.rowCount});
    } catch (error) {
        next(error);
    } 
}

const deleteUnverifiedUsers = async (req, res, next) => {
    const { emails } = req.body;

    if (!areEmailsValid(emails)) {
        return res.status(400).json({message: "Invalid emails are given"});
    }

    try {
        const result = await db.result(`
            DELETE FROM users WHERE email = ANY($1) AND status = 'unverified'
        `, [emails]);

        return res.status(200).json({message: "Unverified users deleted successfully", count: result.rowCount});
    } catch(error) {
        next(error)
    }
}

function areEmailsValid(emails) {
    return emails && Array.isArray(emails) && emails.length !== 0;
}

module.exports = {
    deleteUnverifiedUsers, deleteUsers
}
