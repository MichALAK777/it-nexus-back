import { Request, Response } from 'express';
import { CadClienteService } from '../../services/Cliente/CadClienteService';

class CadClienteController {
  async handle(req: Request, res: Response) {
    const empresa = req.body;
    const model = new CadClienteService();

    const result = await model.execute(empresa);

    return res.json(result);
  }
}

export { CadClienteController };
