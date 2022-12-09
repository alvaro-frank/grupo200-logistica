import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IPackagingRepo from '../services/IRepos/IPackagingRepo';
import IPackagingPersistence from '../dataschema/IPackagingPersistence';
import { Packaging } from '../domain/packaging';
import { PackagingId } from '../domain/packagingId';
import { PackagingMap } from '../mappers/PackagingMap';

@Service()
export default class PackagingRepo implements IPackagingRepo {

    constructor(
        @Inject('packagingSchema') private packagingSchema: Model<IPackagingPersistence & Document>,
    ) { }

    public async exists(packaging: Packaging): Promise<boolean> {
        const idX = packaging.id instanceof PackagingId ? (<PackagingId>packaging.id).toValue() : packaging.id;

        const query = { domainId: idX };
        const packagingDocument = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistence & Document>);

        return !!packagingDocument === true;
    }

    public async save(packaging: Packaging): Promise<Packaging> {
        const query = { domainId: packaging.id.toString() };

        const packagingDocument = await this.packagingSchema.findOne(query);

        try {
            if (packagingDocument === null) {
                const rawPackaging: any = PackagingMap.toPersistence(packaging);

                const packagingCreated = await this.packagingSchema.create(rawPackaging);

                return PackagingMap.toDomain(packagingCreated);
            } else {

                packagingDocument.posX = packaging.posX;
                packagingDocument.posY = packaging.posY;
                packagingDocument.posZ = packaging.posZ;
                packagingDocument.active = packaging.active;

                await packagingDocument.save();

                return packaging;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(packagingId: PackagingId | string): Promise<Packaging> {
        const query = { domainId: packagingId };
        const packagingRecord = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistence & Document>);

        if (packagingRecord != null) {
            return PackagingMap.toDomain(packagingRecord);
        }
        else
            return null;
    }

    public async findByName(name: string | string): Promise<Packaging> {
        const query = { name: name };
        const packagingRecord = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistence & Document>);

        if (packagingRecord != null) {
            return PackagingMap.toDomain(packagingRecord);
        }
        else
            return null;
    }

    async findAll(): Promise<Packaging[]> {
        const packagingList = await this.packagingSchema.find();

        if (packagingList != null) {
            let packagingDomainList: Packaging[] = []
            for (let index = 0; index < packagingList.length; index++) {
                const packaging = packagingList[index];
                const packagingDomain = PackagingMap.toDomain(packaging)
                packagingDomainList.push(packagingDomain)
            }

            return packagingDomainList
        } else {
            return null;
        }
    }
}
