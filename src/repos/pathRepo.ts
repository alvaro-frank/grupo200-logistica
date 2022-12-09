import { Service, Inject } from 'typedi';

import IPathRepo from "../services/IRepos/IPathRepo";
import { Path } from "../domain/path";
import { PathId } from "../domain/pathId";
import { PathMap } from "../mappers/PathMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(path: Path): Promise<boolean> {
    
    const idX = path.id instanceof PathId ? (<PathId>path.id).toValue() : path.id;

    const query = { domainId: idX}; 
    const pathDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

    return !!pathDocument === true;
  }

  public async save(path: Path): Promise<Path> {
    const query = { domainId: path.id.toString()}; 

    const pathDocument = await this.pathSchema.findOne( query );

    try {
      if (pathDocument === null ) {
        const rawPath: any = PathMap.toPersistence(path);

        const pathCreated = await this.pathSchema.create(rawPath);

        return PathMap.toDomain(pathCreated);
      } else {
        pathDocument.name = path.name;
        pathDocument.nameWarehouseStart = path.nameWarehouseStart;
        pathDocument.nameWarehouseDestiny = path.nameWarehouseDestiny;
        pathDocument.distance = path.distance;
        pathDocument.timePath = path.timePath;
        pathDocument.energySpent = path.energySpent;
        pathDocument.extraTimePath = path.extraTimePath;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(pathId: PathId | string): Promise<Path> {
    const query = { domainId: pathId };
    const pathrecord = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document> );

    if (pathrecord != null) {
      return PathMap.toDomain(pathrecord);
    }
    else
      return null;
  }

  public async findByName(name: string | string): Promise<Path> {
    const query = { name: name };
    const pathrecord = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

    if (pathrecord != null) {
      return PathMap.toDomain(pathrecord);
    }
    else
      return null;
  }

  async findAll(): Promise<Path[]> {
    const pathList = await this.pathSchema.find();

    if (pathList != null) {
        let pathDomainList = []
        for (let index = 0; index < pathList.length; index++) {
            const path = pathList[index];
            const pathDomain = PathMap.toDomain(path)
            pathDomainList.push(pathDomain)
        }

        return pathDomainList
    } else {
        return null;
    }
}
}
