import prismaClient from '../../prisma';
import md5 from 'md5';

interface PassUserRequest {
  usuario_id: number;
  senha_atual: string;
  senha_nova: string;
}

class AltSenhaUsuarioService {
  async execute({
    usuario_id: usuario_id,
    senha_atual: senha_atual,
    senha_nova: senha_nova,
  }: PassUserRequest) {
    if (!senha_atual) throw new Error('Senha Atual Inválida!');
    if (!senha_nova) throw new Error('Senha Nova Inválida!');

    const user = await prismaClient.usuario.findFirst({
      where: { id: usuario_id },
      select: {
        senha: true,
      },
    });

    const hashSenhaAtual = md5(senha_atual);
    const hashSenhaNova = md5(senha_nova);

    if (user?.senha !== hashSenhaAtual)
      throw new Error(`Senha Atual Informada está incorreta!`);

    const result = await prismaClient.usuario.update({
      where: { id: usuario_id },
      data: {
        atualizado_em: new Date(),
        senha: hashSenhaNova,
      },
      select: {
        id: true,
        nome: true,
        login: true,
        email: true,
      },
    });

    return result;
  }
}

export { AltSenhaUsuarioService };
