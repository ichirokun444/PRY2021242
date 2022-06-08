import { Express } from 'express';
import { HistoriaController } from '../controller/historia.controller';

export class HistoriaRoutes {
  constructor(private app: Express, private controller: HistoriaController) {

    this.app.get('/historia', (req, res, next) => this.controller.list(req, res, next));
    this.app.get('/historia/doctor/:id', (req, res, next) => this.controller.listDoctor(req, res, next));
    this.app.get('/historia/paciente/:id', (req, res, next) => this.controller.listUsuario(req, res, next));
    this.app.get('/historia/:code', (req, res, next) => this.controller.get(req, res, next));
    this.app.post('/historia', (req, res, next) => this.controller.save(req, res, next));
    this.app.put('/historia/:id', (req, res, next) => this.controller.update(req, res, next));
    this.app.delete('/historia/:id', (req, res, next) => this.controller.delete(req, res, next));
  }
}