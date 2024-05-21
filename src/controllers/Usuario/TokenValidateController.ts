import { Request, Response } from 'express';
import { TokenValidateService } from '../../services/Usuario/TokenValidateService';

class TokenValidateController {
  async handle(req: Request, res: Response) {
    const { token } = req.body;
    const model = new TokenValidateService();
    const result = await model.execute({ token });
    return res.json(result);
  }
}

export { TokenValidateController };
