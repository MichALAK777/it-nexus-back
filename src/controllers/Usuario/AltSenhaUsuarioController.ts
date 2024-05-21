import { Request, Response } from 'express';
import { AltSenhaUsuarioService } from '../../services/Usuario/AltSenhaUsuarioService';

class AltSenhaUsuarioController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { senha_atual, senha_nova } = req.body;
    const model = new AltSenhaUsuarioService();

    const result = await model.execute({
      usuario_id: user_id,
      senha_atual: senha_atual,
      senha_nova: senha_nova,
    });
    return res.json(result);
  }
}

export { AltSenhaUsuarioController };
