import { Express } from 'express';
import { RolController } from '../controller/rol.controller';

export class RolRoutes {
  constructor(private app: Express, private controller: RolController) {

    this.app.get('/rol', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/rol/:code', (req, res, next) => this.controller.get(req, res, next));
    this.app.post('/rol', (req, res, next) => this.controller.save(req, res, next));

    this.app.put('/rol/:id', (req, res, next) => this.controller.update(req, res, next));
    this.app.delete('/rol/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}