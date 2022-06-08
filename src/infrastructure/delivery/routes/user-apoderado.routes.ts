import { Express } from 'express';
import { UserApoderadoController } from '../controller/user-apoderado.controller';

export class UserApoderadoRoutes {
  constructor(private app: Express, private controller: UserApoderadoController) {
    this.app.get('/user/:id/apoderado', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/user/:id/poderdante', (req, res, next) => this.controller.listPoderdante(req, res, next));
    this.app.post('/user/:id/apoderado', (req, res, next) => this.controller.save(req, res, next));
    this.app.delete('/user/:userid/apoderado/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}