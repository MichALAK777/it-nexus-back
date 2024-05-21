import prismaClient from '../../prisma';
import md5 from 'md5';
const jwt = require('jsonwebtoken');

interface PassUserRequest {
  usuario_id: number;
  senha_nova: string;
  token: string;
}

class CadSenhaUsuarioService {
  async execute({
    usuario_id: usuario_id,
    senha_nova: senha_nova,
    token: token,
  }: PassUserRequest) {
    if (!usuario_id) throw new Error('usuário Inválido!');
    if (!senha_nova) throw new Error('Senha Nova Inválida!');

    if (!token) throw new Error('Token não fornecido!!!');

    try {
      // Verifica a assinatura do token usando a chave secreta
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado!');
    }

    const user = await prismaClient.usuario.findFirst({
      where: { id: usuario_id },
      select: {
        senha: true,
      },
    });

    const hashSenhaNova = md5(senha_nova);

    const result = await prismaClient.usuario.update({
      where: { id: usuario_id },
      data: {
        atualizado_em: new Date(),
        senha: hashSenhaNova,
      },
      select: {
        id: true,
        login: true,
      },
    });

    return {
      status: true,
      message: 'Senha Alterada com Sucesso',
    };
  }
}

export { CadSenhaUsuarioService };
