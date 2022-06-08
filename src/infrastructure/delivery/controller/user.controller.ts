import { NextFunction, Request, Response } from 'express';
import { UserPasswordUpdate } from '../../../domain/dto/user-password.update';
import { UserStatusUpdate } from '../../../domain/dto/user-status.update';
import { UserSave } from '../../../domain/dto/user.save';
import { UserUpdate } from '../../../domain/dto/user.update';
import { UserUsecase } from '../../../domain/usecase/user.usecase';
import { CustomError } from '../middleware/error.middleware';

export class UserController {
  constructor(private uc: UserUsecase) { }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const dni = req.params.dni;
      const result = await this.uc.getUser(dni);
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.uc.listUser();
      res.send(result);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const userR: UserSave = req.body
      const userId = await this.uc.saveUser(userR);
      res.send({ id: userId });
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userR: UserUpdate = req.body
      userR.id = id;
      const resp = await this.uc.updateUser(userR);
      res.send({ resp });
    } catch (err) {
      console.log(err);
      const [first] = (err as any)?.details;
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async password(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userR: UserPasswordUpdate = req.body
      userR.id = id;
      const resp = await this.uc.updatePassword(userR);
      res.send({ resp });
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }

  async status(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userR: UserStatusUpdate = req.body
      userR.id = id;
      const resp = await this.uc.updateStatusUser(userR);
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await this.uc.login(username, password);
      res.send(user);
    } catch (err) {
      const [first] = (err as any).details
      const message = first.message.split(',')[1];
      next(new CustomError(message));
    }
  }
}