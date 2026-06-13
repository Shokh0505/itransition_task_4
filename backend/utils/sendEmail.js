const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    const verificationUrl = process.env.BASE_URL + "/api/auth/verify-email?token=" + token;
    console.log(verificationUrl, " url for verifying the email");

    const mailInfo = {
        from: "Itransition task4 Shokhjahon Alijovon",
        to: email,
        subject: "Verify email address",
        html: `
            <h1>Welcome to the Platform!</h1>
            <p>Thank you for signing up. Please click the button below to verify your email address and activate your account:</p>
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
            <p>This link will expire in 1 hour.</p>
            <hr />
            <p>If you didn't create this account, you can safely ignore this email.</p>
`,
    }

    await transporter.sendMail(mailInfo);
}

module.exports = {
    sendVerificationEmail
}
