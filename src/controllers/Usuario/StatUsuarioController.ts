import { Request, Response } from 'express';
import { StatUsuarioService } from '../../services/Usuario/StatUsuarioService';

class StatUsuarioController {
  async handle(req: Request, res: Response) {
    const user = req.body;
    const model = new StatUsuarioService();

    const result = await model.execute(user);

    return res.json(result);
  }
}

export { StatUsuarioController };
