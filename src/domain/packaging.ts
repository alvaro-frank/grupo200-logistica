import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import IPackagingDTO from "../dto/IPackagingDTO";
import { PackagingId } from "./packagingId";

interface PackagingProps {
    posX: number;
    posY: number;
    posZ: number;
    active: boolean;
    truckId: string;
    timeToLoadTruck: string;
    timeToOffloadTruck: string;
}

export class Packaging extends AggregateRoot<PackagingProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get packagingId(): PackagingId {
        return new PackagingId(this.packagingId.toValue());
    }

    get posX(): number {
        return this.props.posX;
    }

    get posY(): number {
        return this.props.posY;
    }

    get posZ(): number {
        return this.props.posZ;
    }

    get active(): boolean {
        return this.props.active;
    }

    get truckId(): string {
        return this.props.truckId;
    }

    get timeToLoadTruck(): string {
        return this.props.timeToLoadTruck;
    }

    get timeToOffloadTruck(): string {
        return this.props.timeToOffloadTruck;
    }

    set posX(value: number) {
        this.props.posX = value;
    }

    set posY(value: number) {
        this.props.posY = value;
    }

    set posZ(value: number) {
        this.props.posZ = value;
    }

    set active(value: boolean) {
        this.props.active = value;
    }

    set truckId(value: string)  {
        this.props.truckId = value;
    }

    set timeToLoadTruck(value: string)  {
        this.props.timeToLoadTruck = value;
    }

    set timeToOffloadTruck(value: string)  {
        this.props.timeToOffloadTruck = value;
    }

    private constructor(props: PackagingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {

        const guardedProps = [
            { argument: packagingDTO.posX, argumentName: 'posX' },
            { argument: packagingDTO.posY, argumentName: 'posY' },
            { argument: packagingDTO.posZ, argumentName: 'posZ' },
            { argument: packagingDTO.active, argumentName: 'active' },
            { argument: packagingDTO.truckId, argumentName: 'truckId' },
            { argument: packagingDTO.timeToLoadTruck, argumentName: 'timeToLoadTruck' },
            { argument: packagingDTO.timeToOffloadTruck, argumentName: 'timeToOffloadTruck' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<Packaging>(guardResult.message)
        }
        else {
            const packaging = new Packaging({
                posX: packagingDTO.posX,
                posY: packagingDTO.posY,
                posZ: packagingDTO.posZ,
                active: packagingDTO.active,
                truckId: packagingDTO.truckId,
                timeToLoadTruck: packagingDTO.timeToLoadTruck,
                timeToOffloadTruck: packagingDTO.timeToOffloadTruck,
            }, id);

            return Result.ok<Packaging>(packaging)
        }
    }
}
