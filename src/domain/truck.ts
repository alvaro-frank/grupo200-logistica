import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";

import ITruckDTO from "../dto/ITruckDTO";

interface TruckProps {
  name: string;
  weight: string;
  maxCargo: string;
  batteryCapacity: string;
  drivingRangeMaxCargo: string;
  chargingTime: string;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get truckId(): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  get weight(): string {
    return this.props.weight;
  }

  get maxCargo(): string {
    return this.props.maxCargo;
  }

  get batteryCapacity(): string {
    return this.props.batteryCapacity;
  }

  get drivingRangeMaxCargo(): string {
    return this.props.drivingRangeMaxCargo;
  }

  get chargingTime(): string {
    return this.props.chargingTime;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set weight(value: string) {
    this.props.weight = value;
  }

  set maxCargo(value: string) {
    this.props.maxCargo = value;
  }

  set batteryCapacity(value: string) {
    this.props.batteryCapacity = value;
  }

  set drivingRangeMaxCargo(value: string) {
    this.props.drivingRangeMaxCargo = value;
  }

  set chargingTime(value: string) {
    this.props.chargingTime = value;
  }

  private constructor(props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const name = truckDTO.name;
    const weight = truckDTO.weight;
    const maxCargo = truckDTO.maxCargo;
    const batteryCapacity = truckDTO.batteryCapacity;
    const drivingRangeMaxCargo = truckDTO.drivingRangeMaxCargo;
    const chargingTime = truckDTO.chargingTime;

    if (!!name === false || name.length === 0 
      || !!weight === false || weight.length === 0
      || !!maxCargo === false || maxCargo.length === 0
      || !!batteryCapacity === false || batteryCapacity.length === 0
      || !!drivingRangeMaxCargo === false || drivingRangeMaxCargo.length === 0
      || !!chargingTime === false || chargingTime.length === 0) {
      return Result.fail<Truck>('Must provide a truck name')
    } else {
      const truck = new Truck({ name: name, weight: weight, maxCargo: maxCargo, batteryCapacity: batteryCapacity, drivingRangeMaxCargo: drivingRangeMaxCargo, chargingTime: chargingTime }, id);
      return Result.ok<Truck>(truck)
    }
  }
}
