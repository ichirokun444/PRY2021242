import { NextFunction, Request, Response } from 'express';
import { HistoriaSave } from '../../../domain/dto/historia.save';
import { HistoriaUpdate } from '../../../domain/dto/historia.update';
import { HistoriaUsecase } from '../../../domain/usecase/historia.usecase';
import { CustomError } from '../middleware/error.middleware';

export class HistoriaController {
  constructor(private uc: HistoriaUsecase) { }

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

  async listUsuario(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      let result = await this.uc.list();
      result = result.filter(it => it.paciente == id)
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async listDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      let result = await this.uc.list();
      result = result.filter(it => it.medico == id)
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const save: HistoriaSave = req.body
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
      const userR: HistoriaUpdate = req.body
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