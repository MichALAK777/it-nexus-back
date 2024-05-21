import { Request, Response } from 'express';
import { AltUsuarioService } from '../../services/Usuario/AltUsuarioService';

class AltUsuarioController {
  async handle(req: Request, res: Response) {
    const usuario = req.body;
    const model = new AltUsuarioService();

    const result = await model.execute(usuario);

    return res.json(result);
  }
}

export { AltUsuarioController };
