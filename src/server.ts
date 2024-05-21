import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
require('dotenv').config();

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.get('/', (req: Request, res: Response) => {
  const json = {
    status: 'ok',
    message: 'Sistema Nexus IT em Produção!',
  };
  res.json(json);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 63027, () =>
  console.log('Servidor Nexus IT Online, porta 63027!')
);
