import { format } from 'date-fns';
import prismaClient from '../../prisma';

interface AltUsuarioRequest {
  id: number;
  nome: string;
  login: string;
  email: string;
  observacao: string;
  perfil: number;
}

class AltUsuarioService {
  async execute({
    id,
    nome,
    login,
    email,
    observacao,
    perfil,
  }: AltUsuarioRequest) {
    if (!nome) throw new Error('Nome Inválido!');
    if (!login) throw new Error('Login Inválido!');

    const now = new Date();

    const result = await prismaClient.usuario.update({
      where: { id: id },
      data: {
        nome: nome,
        login: login,
        email: email,
        observacao: observacao,
        perfil: perfil,
        atualizado_em: now,
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

export { AltUsuarioService };
