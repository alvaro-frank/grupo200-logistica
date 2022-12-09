import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';

const PackagingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    posX: { type: Number },
    posY: { type: Number },
    posZ: { type: Number },
    active: { type: Boolean },
    truckId: { type: String },
    timeToLoadTruck: { type: String },
    timeToOffloadTruck: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', PackagingSchema);
