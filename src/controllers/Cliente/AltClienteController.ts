import { Request, Response } from 'express';
import { AltClienteService } from '../../services/Cliente/AltClienteService';

class AltClienteController {
  async handle(req: Request, res: Response) {
    const empresa = req.body;
    const model = new AltClienteService();

    const result = await model.execute(empresa);

    return res.json(result);
  }
}

export { AltClienteController };
