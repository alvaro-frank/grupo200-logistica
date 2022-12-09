import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { TruckId } from "../../domain/truckId";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId(truckId: TruckId | string): Promise<Truck>;
  findByName(name: string | string): Promise<Truck>;
  findAll(): Promise<ITruckDTO[]>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}
