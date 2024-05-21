import { format } from 'date-fns';
import prismaClient from '../../prisma';

interface StatUsuarioRequest {
  id: number;
  ativo: boolean;
}

class StatUsuarioService {
  async execute({ id, ativo }: StatUsuarioRequest) {
    const now = new Date();

    const result = await prismaClient.usuario.update({
      where: { id: id },
      data: {
        ativo: ativo,
        atualizado_em: now,
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

export { StatUsuarioService };
