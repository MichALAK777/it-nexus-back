import prismaClient from '../../prisma';

interface ClienteGetRequest {
  id: number;
}

class GetClienteService {
  async execute({ id }: ClienteGetRequest) {
    const result = await prismaClient.cliente.findFirst({
      where: {
        id: id,
      },
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
    });

    return result;
  }
}

export { GetClienteService };
