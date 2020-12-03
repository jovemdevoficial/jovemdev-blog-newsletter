import Cors from 'cors';
import * as Yup from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';

import { initMiddleware } from '../../middlewares/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  }),
);

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res);

    const {
      body: { email },
      method,
    } = req;

    const schema = Yup.string()
      .email('E-mail inválido')
      .required('O e-mail precisa ser enviado');

    await schema.validate(email, {
      abortEarly: false,
    });

    switch (method) {
      case 'GET':
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ name: 'John Doe' });
        break;
      case 'POST':
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ email: `Este é seu e-mail: ${email}` });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Metodo ${method} não permitido`);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error });
    }
  }
};
