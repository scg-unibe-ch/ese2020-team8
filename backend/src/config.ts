export const config = {
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    mailer: {
        host: process.env.MAIL_HOST || 'smtp.ethereal.email',
        port: process.env.MAIL_PORT || 587,
        secure: process.env.MAIL_SECURE === 'true',
        auth: process.env.MAIL_USER ? {
            user: process.env.MAIL_USER || 'username',
            pass: process.env.MAIL_PASSWORD || 'password'
        } : null
    }
};
