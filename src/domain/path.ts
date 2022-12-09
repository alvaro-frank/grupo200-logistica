import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PathId } from "./pathId";

import IPathDTO from "../dto/IPathDTO";

interface PathProps {
  name: string;
  nameWarehouseStart: string;
  nameWarehouseDestiny: string;
  distance: string;
  timePath: string;
  energySpent: string;
  extraTimePath: string;
}

export class Path extends AggregateRoot<PathProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get pathId(): PathId {
    return new PathId(this.pathId.toValue());
  }
  get name(): string {
    return this.props.name;
  }

  get nameWarehouseStart(): string {
    return this.props.nameWarehouseStart;
  }

  get nameWarehouseDestiny(): string {
    return this.props.nameWarehouseDestiny;
  }

  get distance(): string {
    return this.props.distance;
  }

  get timePath(): string {
    return this.props.timePath;
  }

  get energySpent(): string {
    return this.props.energySpent;
  }

  get extraTimePath(): string {
    return this.props.extraTimePath;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set nameWarehouseStart(value: string) {
    this.props.nameWarehouseStart = value;
  }

  set nameWarehouseDestiny(value: string) {
    this.props.nameWarehouseDestiny = value;
  }

  set distance(value: string) {
    this.props.distance = value;
  }

  set timePath(value: string) {
    this.props.timePath = value;
  }

  set energySpent(value: string) {
    this.props.energySpent = value;
  }

  set extraTimePath(value: string) {
    this.props.extraTimePath = value;
  }

  private constructor(props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(pathDTO: IPathDTO, id?: UniqueEntityID): Result<Path> {
    const name = pathDTO.name;
    const nameWarehouseStart = pathDTO.nameWarehouseStart;
    const nameWarehouseDestiny = pathDTO.nameWarehouseDestiny;
    const distance = pathDTO.distance;
    const timePath = pathDTO.timePath;
    const energySpent = pathDTO.energySpent;
    const extraTimePath = pathDTO.extraTimePath;

    
    if (!!name === false || name.length === 0) {
      return Result.fail<Path>('Must provide a path name')
    } else {
      const path = new Path({ name: name, nameWarehouseStart: nameWarehouseStart, nameWarehouseDestiny: nameWarehouseDestiny, 
        distance: distance, timePath: timePath, energySpent: energySpent, extraTimePath: extraTimePath }, id);
      return Result.ok<Path>(path)
    }
  }
}
