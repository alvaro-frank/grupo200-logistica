import { Repo } from "../../core/infra/Repo";
import { Packaging } from "../../domain/packaging";
import { PackagingId } from "../../domain/packagingId";

export default interface IPackagingRepo extends Repo<Packaging> {
  save(packaging: Packaging): Promise<Packaging>;
  findByDomainId(packagingId: PackagingId | string): Promise<Packaging>;
  findByName(name: string | string): Promise<Packaging>;
  findAll(): Promise<Packaging[]>;
}
