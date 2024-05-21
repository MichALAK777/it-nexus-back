import prismaClient from '../../prisma';

class DetalheUsuarioService {
  async execute(usuario_id: number) {
    const result = await prismaClient.usuario.findFirst({
      where: { id: usuario_id },
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

export { DetalheUsuarioService };
