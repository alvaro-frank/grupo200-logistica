import { it } from 'mocha';
import { Truck } from '../../src/domain/truck';
import { expect } from 'chai';
import { Result } from '../../src/core/logic/Result';

describe('Test post class to ensure that business rules are properly used', () => {
    it('cannot create post that has the value of name null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "",
            weight: "string",
            maxCargo: "string",
            batteryCapacity: "string",
            drivingRangeMaxCargo: "string",
            chargingTime: "string",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });

    it('cannot create post that has the value of weight null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "string",
            weight: "",
            maxCargo: "string",
            batteryCapacity: "string",
            drivingRangeMaxCargo: "string",
            chargingTime: "string",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });

    it('cannot create post that has the value of maxCargo null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "string",
            weight: "string",
            maxCargo: "",
            batteryCapacity: "string",
            drivingRangeMaxCargo: "string",
            chargingTime: "string",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });

    it('cannot create post that has the value of batteryCapacity null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "string",
            weight: "string",
            maxCargo: "string",
            batteryCapacity: "",
            drivingRangeMaxCargo: "string",
            chargingTime: "string",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });

    it('cannot create post that has the value of drivingRangeMaxCargo null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "string",
            weight: "string",
            maxCargo: "string",
            batteryCapacity: "string",
            drivingRangeMaxCargo: "",
            chargingTime: "string",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });

    it('cannot create post that has the value of chargingTime null', () => {
        const expected = Result.fail < Truck > ("Must provide a truck name");
        const props = {
            id: "string",
            name: "string",
            weight: "string",
            maxCargo: "string",
            batteryCapacity: "string",
            drivingRangeMaxCargo: "string",
            chargingTime: "",
        }
        const obtained = Truck.create(props);
        expect(obtained.error).to.equal(expected.error);
        expect(obtained.isFailure).to.equal(true);
    });
})