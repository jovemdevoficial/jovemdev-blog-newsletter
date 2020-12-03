import { NextApiHandler } from 'next';

export function initMiddleware(middleware): NextApiHandler {
  return (req, res) => {
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        } else {
          return resolve(result);
        }
      });
    });
  };
}
