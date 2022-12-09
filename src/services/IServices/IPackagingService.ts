import { Result } from "../../core/logic/Result";
import IPackagingDTO from "../../dto/IPackagingDTO";

export default interface IPackagingService {
  createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  getPackaging(packagingDTO: string): Promise<Result<IPackagingDTO>>;
  getAllPackaging(): Promise<Result<IPackagingDTO[]>>;
}
