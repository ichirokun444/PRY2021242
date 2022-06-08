import { Express } from 'express';
import { EspecialidadController } from '../controller/especialidad.controller';

export class EspecialidadRoutes {
  constructor(private app: Express, private controller: EspecialidadController) {
    this.app.get('/especialidad', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/especialidad/:code', (req, res, next) => this.controller.get(req, res, next));
    this.app.post('/especialidad', (req, res, next) => this.controller.save(req, res, next));
    this.app.put('/especialidad/:id', (req, res, next) => this.controller.update(req, res, next));
    this.app.delete('/especialidad/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}