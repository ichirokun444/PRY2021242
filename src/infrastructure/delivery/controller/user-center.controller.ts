import { NextFunction, Request, Response } from 'express';
import { UserCenterSave } from '../../../domain/dto/user-center.save';
import { UserCenterUsecase } from '../../../domain/usecase/user-center.usecase';
import { CustomError } from '../middleware/error.middleware';

export class UserCenterController {
  constructor(private uc: UserCenterUsecase) { }

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

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const save: UserCenterSave = req.body
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