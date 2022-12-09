import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import IPathController from '../../controllers/IControllers/IPathController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/paths', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        nameWarehouseStart: Joi.string().required(),
        nameWarehouseDestiny: Joi.string().required(),
        distance: Joi.string().required(),
        timePath: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTimePath: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        nameWarehouseStart: Joi.string().required(),
        nameWarehouseDestiny: Joi.string().required(),
        distance: Joi.string().required(),
        timePath: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTimePath: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.updatePath(req, res, next));

  //route.get('/:pathId', (req, res, next) => ctrl.getPath(req, res, next));

  route.get('/:name', (req, res, next) => ctrl.getPathByName(req, res, next));
  route.get('', (req, res, next) => ctrl.getAllPath(req, res, next));
};
