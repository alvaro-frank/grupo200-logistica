import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    weight: { type: String },
    maxCargo: { type: String },
    batteryCapacity: { type: String },
    drivingRangeMaxCargo: { type: String },
    chargingTime: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
