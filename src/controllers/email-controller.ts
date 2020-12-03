import type { NextApiRequest, NextApiResponse } from 'next';

class EmailController {
  async index(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ name: 'John Doe' });
  }

  async store(req: NextApiRequest, res: NextApiResponse, email: string) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ email: `Este é seu e-mail: ${email}` });
  }

  async default(req: NextApiRequest, res: NextApiResponse, method: string) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Método ${method} não permitido` });
  }
}

export default new EmailController();
