import prismaClient from '../../prisma';

interface ClienteRequest {
  descricao: string;
  site: string;
  cpf_cnpj: string;
  observacao: string;
  endereco_id: number;
  cep: string;
  endereco: string;
  endereco_numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

class CadClienteService {
  async execute({
    descricao,
    site,
    cpf_cnpj,
    observacao,
    cep,
    endereco,
    endereco_numero,
    complemento,
    bairro,
    cidade,
    uf,
  }: ClienteRequest) {
    if (!descricao) throw new Error('Nome Inválido!');
    if (!cpf_cnpj) throw new Error('E-mail Inválido!');

    const idAlreadyExixts = await prismaClient.cliente.findFirst({
      where: { cpf_cnpj: cpf_cnpj },
    });
    if (idAlreadyExixts) {
      throw new Error(`Cliente \'CPF ou CNPJ: ${cpf_cnpj}\' já cadastrada!`);
    }

    var res_endereco = await prismaClient.endereco.create({
      data: {
        cep: cep,
        endereco: endereco,
        endereco_numero: endereco_numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
      },
      select: {
        id: true,
      },
    });

    const result = await prismaClient.cliente.create({
      data: {
        descricao: descricao,
        site: site,
        cpf_cnpj: cpf_cnpj,
        observacao: observacao,
        endereco_id: res_endereco.id,
        ativo: true,
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

export { CadClienteService };
