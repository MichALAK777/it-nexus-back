import prismaClient from '../../prisma';
import md5 from 'md5';

interface UserRequest {
  nome: string;
  email: string;
  login: string;
  senha: string;
  perfil: number;
  cliente_id: number;
}

class CadUsuarioService {
  async execute({
    nome,
    email,
    login,
    senha,
    perfil,
    cliente_id,
  }: UserRequest) {
    if (!nome) throw new Error('Nome Inválido!');
    if (!email) throw new Error('E-mail Inválido!');

    const idAlreadyExixts = await prismaClient.usuario.findFirst({
      where: { login: login },
    });
    if (idAlreadyExixts) {
      throw new Error(`Usuário \'Login: ${login}\' já cadastrado!`);
    }

    if (!!login) {
      const userAlreadyExixts = await prismaClient.usuario.findFirst({
        where: { login: login },
      });
      if (userAlreadyExixts) {
        throw new Error(`Usuário \'${login}\' já cadastrado!`);
      }
    }

    const hashPass = md5(senha);

    const result = await prismaClient.usuario.create({
      data: {
        nome: nome,
        email: email,
        login: login,
        senha: hashPass,
        perfil: perfil,
        cliente_id: cliente_id,
        criado_em: new Date(),
        atualizado_em: new Date(),
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        login: true,
        email: true,
        ativo: true,
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

    return result;
  }
}

export { CadUsuarioService };
