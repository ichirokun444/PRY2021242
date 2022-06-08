import { Express } from 'express';
import { UserCenterController } from '../controller/user-center.controller';

export class UserCenterRoutes {
  constructor(private app: Express, private controller: UserCenterController) {
    this.app.get('/user/:id/centro', (req, res, next) => this.controller.list(req, res, next));
    this.app.post('/user/:id/centro', (req, res, next) => this.controller.save(req, res, next));
    this.app.delete('/user/:userid/centro/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}