import { Service, Inject } from 'typedi';
import config from '../../config';
import IPathDTO from '../dto/IPathDTO';
import { Path } from '../domain/path';
import IPathRepo from '../services/IRepos/IPathRepo';
import IPathService from './IServices/IPathService';
import { Result } from '../core/logic/Result';
import { PathMap } from '../mappers/PathMap';
import axios from 'axios';
import { response } from 'express';
import { Console } from 'console';

@Service()
export default class pathService implements IPathService {
  constructor(@Inject(config.repos.path.name) private pathRepo: IPathRepo) {}

  public async getPath(pathId: string): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathId);

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPathByName(name: string): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByName(name);

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPath() {
    try {
      const pathListOrError = await this.pathRepo.findAll();

      let pathDTOList = [];
      for (let index = 0; index < pathListOrError.length; index++) {
        const path = pathListOrError[index];
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        pathDTOList.push(pathDTOResult);
      }

      return Result.ok<IPathDTO[]>(pathDTOList);
    } catch (e) {
      throw e;
    }
  }

  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      
      //const axios = require('axios').default;
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

      var warehouseStart = 'https://localhost:5001/api/warehouses/' + pathDTO.nameWarehouseStart;
      var warehouseEnd = 'https://localhost:5001/api/warehouses/' + pathDTO.nameWarehouseDestiny;

      try {
        var resultado = await axios.get(warehouseStart);
        if (resultado.status != 200) {
          return Result.fail<IPathDTO>('Error - Starting WH does not exist');
        }
      } catch (e) {
        return Result.fail<IPathDTO>('Error - Starting WH does not exist');
      }

      try {
        var resultado = await axios.get(warehouseEnd);
        if (resultado.status != 200) {
          return Result.fail<IPathDTO>('Error - Destiny WH does not exist');
        }
      } catch (e) {
        return Result.fail<IPathDTO>('Error - Destiny WH does not exist');
      }

      try {
        var name = await this.getPathByName(pathDTO.name);
        if (name.isSuccess) {
          return Result.fail<IPathDTO>('Error - This path already exists');
        }
      } catch (e) {
        return Result.fail<IPathDTO>('Error - This path already exists');
      }

      const pathOrError = await Path.create(pathDTO);
      if (pathOrError.isFailure) {
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      const pathResult = pathOrError.getValue();

      await this.pathRepo.save(pathResult);

      const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;
      return Result.ok<IPathDTO>(pathDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

      var warehouseStart = 'https://localhost:5001/api/warehouses/' + pathDTO.nameWarehouseStart;
      var warehouseEnd = 'https://localhost:5001/api/warehouses/' + pathDTO.nameWarehouseDestiny;

     
      try {
        var resultado = await axios.get(warehouseStart);
        if (resultado.status != 200) {
          return Result.fail<IPathDTO>('Error - Starting WH does not exist');
        }
      } catch (e) {
        return Result.fail<IPathDTO>('Error - Starting WH does not exist');
      }

      try {
        var resultado = await axios.get(warehouseEnd);
        if (resultado.status != 200) {
          return Result.fail<IPathDTO>('Error - Destiny WH does not exist');
        }
      } catch (e) {
        return Result.fail<IPathDTO>('Error - Destiny WH does not exist');
      }

      const path = await this.pathRepo.findByName(pathDTO.name);

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        path.name = pathDTO.name;
        path.nameWarehouseStart = pathDTO.nameWarehouseStart;
        path.nameWarehouseDestiny = pathDTO.nameWarehouseDestiny;
        path.distance = pathDTO.distance;
        path.timePath = pathDTO.timePath;
        path.energySpent = pathDTO.energySpent;
        path.extraTimePath = pathDTO.extraTimePath;
        await this.pathRepo.save(path);

        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
