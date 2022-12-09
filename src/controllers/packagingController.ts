import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPackagingDTO from '../dto/IPackagingDTO';

import { Result } from "../core/logic/Result";
import IPackagingController from './IControllers/IPackagingController';
import IPackagingService from '../services/IServices/IPackagingService';

@Service()
export default class packagingController implements IPackagingController {
  constructor(
    @Inject(config.services.packaging.name) private packagingServiceInstance: IPackagingService
  ) { }

  public async createPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.createPackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.json(packagingDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.getPackaging(req.params.packagingId as string);

      if (packagingOrError.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.json(packagingDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.updatePackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json(packagingDTO);
    }
    catch (e) {
      return next(e);
    }
  };

  async getAllPackaging(req: Request, res: Response, next: NextFunction) {
    try {
        const packagingOrError = await this.packagingServiceInstance.getAllPackaging()
        if (packagingOrError.isFailure) {
            return res.status(400).send();
        }

        const packagingDTO = packagingOrError.getValue();
        return res.json(packagingDTO);
    } catch (e) {
        return next(e)
    }
}
}
