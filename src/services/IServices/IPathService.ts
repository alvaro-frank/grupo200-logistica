import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPath(pathDTO: string): Promise<Result<IPathDTO>>;
  getPathByName(pathDTO: string): Promise<Result<IPathDTO>>;
  getAllPath(): Promise<Result<IPathDTO[]>>;
}
