import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import ITruckController from '../../controllers/IControllers/ITruckController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        weight: Joi.string().required(),
        maxCargo: Joi.string().required(),
        batteryCapacity: Joi.string().required(),
        drivingRangeMaxCargo: Joi.string().required(),
        chargingTime: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        weight: Joi.string().required(),
        maxCargo: Joi.string().required(),
        batteryCapacity: Joi.string().required(),
        drivingRangeMaxCargo: Joi.string().required(),
        chargingTime: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));

  route.get('/:truckId', (req, res, next) => ctrl.getTruck(req, res, next));

  route.get("/search", (req, res, next) => ctrl.getTruckByName(req, res, next));

  route.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));

};
