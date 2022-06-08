import { Express } from 'express';
import { UserController } from '../controller/user.controller';

export class UserRoutes {
  constructor(private app: Express, private controller: UserController) {
    this.app.get('/user', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/user/:dni', (req, res, next) => this.controller.get(req, res, next));
    this.app.post('/user', (req, res, next) => this.controller.save(req, res, next));

    this.app.put('/user/:id', (req, res, next) => this.controller.update(req, res, next));
    this.app.delete('/user/:id', (req, res, next) => this.controller.delete(req, res, next));

    this.app.patch('/user/:id/password', (req, res, next) => this.controller.password(req, res, next));
    this.app.patch('/user/:id/status', (req, res, next) => this.controller.status(req, res, next));

    this.app.post('/login', (req, res, next) => this.controller.login(req, res, next));
  }
}