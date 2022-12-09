import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from '../services/IServices/IPathService';
import IPathDTO from '../dto/IPathDTO';

import { Result } from "../core/logic/Result";



@Service()
export default class pathController implements IPathController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.path.name) private pathServiceInstance: IPathService
  ) { }

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;
      
      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.getPath(req.params.pathId as string);

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPathByName(req: Request, res: Response, next: NextFunction) {
    try {
      //req.query.name.toString;
      const pathOrError = await this.pathServiceInstance.getPathByName(req.params.name as string);

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  public async updatePath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.updatePath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.error);
      }

      const pathDTO = pathOrError.getValue();
      return res.status(201).json(pathDTO);
    }
    catch (e) {
      return next(e);
    }
  };

  async getAllPath(req: Request, res: Response, next: NextFunction) {
    try {
        const pathOrError = await this.pathServiceInstance.getAllPath()

        if (pathOrError.isFailure) {
            return res.status(400).send();
        }

        const pathDTO = pathOrError.getValue();
        return res.json(pathDTO);
    } catch (e) {
        return next(e)
    }
}
}
