import prismaClient from '../../prisma';
import { sendEmail } from '../../config/mail';
import { sign } from 'jsonwebtoken';

interface GetMailRequest {
  login: string;
}

class GetMailUsuarioFromLoginService {
  async execute({ login }: GetMailRequest) {
    if (!login) throw new Error('Login inválido!');
    const user = await prismaClient.usuario.findFirst({
      where: {
        login: login,
      },
      select: { id: true, login: true, email: true },
    });

    if (!user) throw new Error('Login não existe!');
    if (!user.email) throw new Error('Email não informado para este Login!');

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido no ambiente.');
    }

    const token = sign(
      {
        login: user.login,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: '5m',
      }
    );

    // enviar email aqui
    const emailSubject = 'Redefinição de Senha';
    const emailBody = `
                  <!DOCTYPE html>
                  <html lang="pt">
                  <head>
                      <meta charset="UTF-8">
                      <title>Redefinição de Senha</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; color: #333; background-color: #ebf5fb; padding: 20px; text-align: center;">
                      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                          <h1 style="color: #985998;">Redefinição de Senha</h1>
                          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Oi! Parece que você esqueceu sua senha, mas não se preocupe! Clique no botão abaixo para criar uma nova.</p>
                          <a href="${process.env.APP_URL_F}/changepass/${token}" style="background-color: #985998; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;" target="_blank">Redefinir Senha</a>
                          <p style="font-size: 14px; line-height: 1.5; margin-top: 20px;">Se você não solicitou uma redefinição de senha, pode ignorar este e-mail tranquilamente. Sua senha continuará a mesma, segura e salva.</p>
                          <hr style="margin-top: 30px;">
                          <footer style="font-size: 12px; color: #777;">
                              <p>Se precisar de ajuda, entre em contato com nosso suporte.</p>
                              <p>Este é um e-mail automático, por favor, não responda.</p>
                          </footer>
                      </div>
                  </body>
                  </html>
                  `;

    await sendEmail(user.email, emailSubject, emailBody);

    return {
      email: user.email,
      token: token,
    };
  }
}

export { GetMailUsuarioFromLoginService };
