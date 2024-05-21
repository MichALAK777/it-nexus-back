import { Request, Response } from 'express';
import { LoginUsuarioService } from '../../services/Usuario/LoginUsuarioService';

class LoginUsuarioController {
  async handle(req: Request, res: Response) {
    const { login, senha } = req.body;
    const model = new LoginUsuarioService();
    const result = await model.execute({ login, senha });
    return res.json(result);
  }
}

export { LoginUsuarioController };
