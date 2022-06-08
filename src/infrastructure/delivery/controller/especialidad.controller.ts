import { NextFunction, Request, Response } from 'express';
import { CenterSave } from '../../../domain/dto/center.save';
import { CenterUpdate } from '../../../domain/dto/center.update';
import { EspecialidadUsecase } from '../../../domain/usecase/especialidad.usecase';
import { CustomError } from '../middleware/error.middleware';

export class EspecialidadController {
  constructor(private uc: EspecialidadUsecase) { }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const code = req.params.code;
      const result = await this.uc.get(code);
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.uc.list();
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const save: CenterSave = req.body
      const id = await this.uc.save(save);
      res.send({ id });
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }


  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userR: CenterUpdate = req.body
      userR.id = id;
      const resp = await this.uc.update(userR);
      res.send({ resp });
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