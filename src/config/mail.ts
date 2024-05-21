import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.customax.inf.br',
  port: 587,
  secure: false, // Note que para a porta 587 geralmente secure é false
  auth: {
    user: 'no-reply@customax.inf.brxxx',
    pass: '@N0vAs3nHa15',
  },
  tls: {
    // Isso é necessário para servidores com certificados autoassinados
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: '"Customax" <no-reply@customax.inf.br>',
    to: to,
    subject: subject,
    html: html,
  };

  return transporter.sendMail(mailOptions);
};
