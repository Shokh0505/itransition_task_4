const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = process.env.BASE_URL + "/api/auth/verify-email?token=" + token;

    const { error } = await resend.emails.send({
        from: 'Itransition task4 Shokhjahon Alijovon <noreply@shokhjahon.uz>',
        to: email,
        subject: 'Verify email address',
        html: `
            <h1>Welcome to the Platform!</h1>
            <p>Thank you for signing up. Please click the button below to verify your email address and activate your account:</p>
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
            <p>This link will expire in 1 hour.</p>
            <hr />
            <p>If you didn't create this account, you can safely ignore this email.</p>
        `,
    });

    if (error) throw new Error(error.message);
};

module.exports = {
    sendVerificationEmail
};
