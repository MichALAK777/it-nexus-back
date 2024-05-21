import { Request, Response } from 'express';
import { CadUsuarioService } from '../../services/Usuario/CadUsuarioService';

class CadUsuarioController {
  async handle(req: Request, res: Response) {
    const Usuario = req.body;
    const model = new CadUsuarioService();

    const result = await model.execute(Usuario);

    return res.json(result);
  }
}

export { CadUsuarioController };
