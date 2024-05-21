import prismaClient from '../../prisma';
import md5 from 'md5';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
  login: string;
  senha: string;
}

class LoginUsuarioService {
  async execute({ login, senha }: AuthRequest) {
    const user = await prismaClient.usuario.findFirst({
      where: {
        login: login,
      },
      select: {
        id: true,
        nome: true,
        login: true,
        email: true,
        ativo: true,
        senha: true,
        cliente: {
          select: {
            id: true,
            descricao: true,
            site: true,
            cpf_cnpj: true,
            observacao: true,
            endereco: {
              select: {
                id: true,
                cep: true,
                endereco: true,
                endereco_numero: true,
                complemento: true,
                bairro: true,
                cidade: true,
                uf: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error(`Usuário login ${login} não cadastrado!`);

    const hashFromDatabase = user.senha;
    const enteredPasswordHash = md5(senha);

    const passMatch = enteredPasswordHash === hashFromDatabase;

    if (!passMatch) throw new Error('Senha incorreta!');

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido no ambiente.');
    }

    const token = sign(
      {
        nome: user.nome,
        login: user.login,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: '30d',
      }
    );

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      login: user.login,
      token: token,
      cliente: user.cliente,
    };
  }
}

export { LoginUsuarioService };
