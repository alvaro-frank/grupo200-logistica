import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPackagingDTO from "../dto/IPackagingDTO";
import { Packaging } from "../domain/packaging";
import { IPackagingPersistence } from "../dataschema/IPackagingPersistence";

export class PackagingMap extends Mapper<Packaging> {

    public static toDTO(packaging: Packaging): IPackagingDTO {
        return {
            posX: packaging.posX,
            posY: packaging.posY,
            posZ: packaging.posZ,
            active: packaging.active,
            truckId: packaging.truckId,
            timeToLoadTruck: packaging.timeToLoadTruck,
            timeToOffloadTruck: packaging.timeToOffloadTruck
        } as IPackagingDTO;
    }

    public static toDomain(packaging: any | Model<IPackagingPersistence & Document>): Packaging {
        const packagingOrError = Packaging.create(packaging, new UniqueEntityID(packaging.domainId));

        packagingOrError.isFailure ? console.log(packagingOrError.error) : '';

        return packagingOrError.isSuccess ? packagingOrError.getValue() : null;
    }

    public static toPersistence(packaging: Packaging): any {
        return {
            domainId: packaging.id.toString(),
            posX: packaging.posX,
            posY: packaging.posY,
            posZ: packaging.posZ,
            active: packaging.active,
            truckId: packaging.truckId,
            timeToLoadTruck: packaging.timeToLoadTruck,
            timeToOffloadTruck: packaging.timeToOffloadTruck
        }
    }
}
