import { Express } from 'express';
import { CenterController } from '../controller/center.controller';

export class CenterRoutes {
  constructor(private app: Express, private controller: CenterController) {
    this.app.get('/center', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/center/:code', (req, res, next) => this.controller.get(req, res, next));
    this.app.post('/center', (req, res, next) => this.controller.save(req, res, next));
    this.app.put('/center/:id', (req, res, next) => this.controller.update(req, res, next));
    this.app.delete('/center/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}