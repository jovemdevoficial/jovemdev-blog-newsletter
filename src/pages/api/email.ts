import Cors from 'cors';
import * as Yup from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';

import emailController from '../../controllers/email-controller';
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
      .email('E-mail Inválido')
      .required('A chave e-mail precisa ser enviada');

    switch (method) {
      case 'GET':
        emailController.index(req, res);
        break;
      case 'POST':
        await schema.validate(email, {
          abortEarly: false,
        });

        emailController.store(req, res, email);
        break;
      default:
        emailController.default(req, res, method);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(400)
      .json({ error: 'Ocorreu um erro inesperado', message: error });
  }
};
