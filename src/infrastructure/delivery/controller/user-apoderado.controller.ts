import { NextFunction, Request, Response } from 'express';
import { UserApoderadoSave } from '../../../domain/dto/user-apoderado.save';
import { UserApoderadoUsecase } from '../../../domain/usecase/user-apoderado.usecase';
import { CustomError } from '../middleware/error.middleware';

export class UserApoderadoController {
  constructor(private uc: UserApoderadoUsecase) { }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.uc.list(+id);
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async listPoderdante(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.uc.listPoderdante(+id);
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const save: UserApoderadoSave = req.body
      const id = await this.uc.save(save);
      res.send({ id });
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const resp = await this.uc.delete(id);
      res.send({ resp });
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

}