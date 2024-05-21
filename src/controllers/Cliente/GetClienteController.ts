import { Request, Response } from 'express';
import { GetClienteService } from '../../services/Cliente/GetClienteService';

class GetClienteController {
  async handle(req: Request, res: Response) {
    const id = parseInt(req.query.id as string, 10);

    const model = new GetClienteService();

    const result = await model.execute({
      id,
    });

    return res.json(result);
  }
}

export { GetClienteController };
