import { Request, Response } from 'express';
import { DetalheUsuarioService } from '../../services/Usuario/DetalheUsuarioService';

class DetalheUsuarioController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const model = new DetalheUsuarioService();

    const result = await model.execute(user_id);
    return res.json(result);
  }
}

export { DetalheUsuarioController };
