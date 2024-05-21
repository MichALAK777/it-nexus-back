import { Request, Response } from 'express';
import { CadSenhaUsuarioService } from '../../services/Usuario/CadSenhaUsuarioService';

class CadSenhaUsuarioController {
  async handle(req: Request, res: Response) {
    const { user_id, senha_nova, token } = req.body;
    const model = new CadSenhaUsuarioService();

    const result = await model.execute({
      usuario_id: +user_id,
      senha_nova: senha_nova,
      token: token,
    });
    return res.json(result);
  }
}

export { CadSenhaUsuarioController };
