import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Packaging } from '../domain/packaging';
import IPackagingDTO from '../dto/IPackagingDTO';
import { PackagingMap } from '../mappers/PackagingMap';
import IPackagingRepo from './IRepos/IPackagingRepo';
import IPackagingService from './IServices/IPackagingService';

@Service()
export default class PackagingService implements IPackagingService {
    constructor(
        @Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo
    ) { }

    public async getPackaging(packagingId: string): Promise<Result<IPackagingDTO>> {
        try {
            const packaging = await this.packagingRepo.findByDomainId(packagingId);

            if (packaging === null) {
                return Result.fail<IPackagingDTO>("Packaging not found");
            }
            else {
                const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
                return Result.ok<IPackagingDTO>(packagingDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllPackaging(): Promise<Result<IPackagingDTO[]>> {
        try {
            const packagingListOrError = await this.packagingRepo.findAll();

            let packagingDTOList: IPackagingDTO[] = []
            for (let index = 0; index < packagingListOrError.length; index++) {
                const packaging = packagingListOrError[index];
                const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
                packagingDTOList.push(packagingDTOResult)
            }

            return Result.ok<IPackagingDTO[]>(packagingDTOList)
        } catch (e) {
            throw e;
        }
    }


    public async createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
        try {
            const packagingOrError = await Packaging.create(packagingDTO);

            if (packagingOrError.isFailure) {
                return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
            }

            const packagingResult = packagingOrError.getValue();

            await this.packagingRepo.save(packagingResult);

            const packagingDTOResult = PackagingMap.toDTO(packagingResult) as IPackagingDTO;
            return Result.ok<IPackagingDTO>(packagingDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
        try {
            const packaging = await this.packagingRepo.findByDomainId(packagingDTO.id);

            if (packaging === null) {
                return Result.fail<IPackagingDTO>("Packaging not found");
            }
            else {

                packaging.posX = packagingDTO.posX;
                packaging.posY = packagingDTO.posY;
                packaging.posZ = packagingDTO.posZ;
                packaging.active = packagingDTO.active;

                await this.packagingRepo.save(packaging);

                const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
                return Result.ok<IPackagingDTO>(packagingDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

}
