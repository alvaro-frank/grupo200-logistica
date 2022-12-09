import { IPathPersistence } from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    nameWarehouseStart: { type: String },
    nameWarehouseDestiny: { type: String },
    distance: { type: String },
    timePath: { type: String },
    energySpent: { type: String },
    extraTimePath: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);
