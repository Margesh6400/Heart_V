import { Request, Response } from 'express';

export const exampleHandler = (req: Request, res: Response) => {
  res.json({ message: 'This is an example controller' });
};