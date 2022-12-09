export default interface IPackagingDTO {
    id: string;
    posX: number;
    posY: number;
    posZ: number;
    active: boolean;
    truckId: string;
    timeToLoadTruck: string;
    timeToOffloadTruck: string;
}
