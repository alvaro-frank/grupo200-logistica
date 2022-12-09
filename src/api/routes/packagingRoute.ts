import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from "../../../config";
import IPackagingController from '../../controllers/IControllers/IPackagingController';

const route = Router();

export default (app: Router) => {
  app.use('/packaging', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.post('',
    celebrate({
      body: Joi.object({
        posX: Joi.number().required(),
        posY: Joi.number().required(),
        posZ: Joi.number().required(),
        active: Joi.boolean().required(),
        truckId: Joi.string(),
        timeToLoadTruck: Joi.string(),
        timeToOffloadTruck: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        posX: Joi.number().required(),
        posY: Joi.number().required(),
        posZ: Joi.number().required(),
        active: Joi.boolean().required(),
        truckId: Joi.string(),
        timeToLoadTruck: Joi.string(),
        timeToOffloadTruck: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next));

  route.get('/:packagingId', (req, res, next) => ctrl.getPackaging(req, res, next));

  route.get('', (req, res, next) => ctrl.getAllPackaging(req, res, next));

};
