import { Request, Response } from 'express';
import { GetMailUsuarioFromLoginService } from '../../services/Usuario/GetMailUsuarioFromLoginService';

class GetMailUsuarioFromLoginController {
  async handle(req: Request, res: Response) {
    const login = req.query.login as string;
    const model = new GetMailUsuarioFromLoginService();
    const result = await model.execute({ login });
    return res.json(result);
  }
}

export { GetMailUsuarioFromLoginController };
