import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckService implements ITruckService {
  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) { }

  public async getTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getTruckByName(name: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByName(name);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTrucks():Promise<Result<ITruckDTO[]>> {
    try{
        let getAllTrucks = await this.truckRepo.findAll();
        if(getAllTrucks == null){
          return Result.fail<ITruckDTO[]>("There are no trucks");
        }
        let listTrucks: ITruckDTO[]=[];
        for(const truck of getAllTrucks){
          listTrucks.push(truck);
        }
        return Result.ok<ITruckDTO[]>(listTrucks);
    }catch(e){
        throw e;
    }
}


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      const truckOrError = await Truck.create(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByName(truckDTO.name);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.name = truckDTO.name;
        truck.weight = truckDTO.weight;
        truck.maxCargo = truckDTO.maxCargo;
        truck.batteryCapacity = truckDTO.batteryCapacity;
        truck.drivingRangeMaxCargo = truckDTO.drivingRangeMaxCargo;
        truck.chargingTime = truckDTO.chargingTime;
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

}
