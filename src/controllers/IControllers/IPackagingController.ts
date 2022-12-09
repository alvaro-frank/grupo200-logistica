import { Request, Response, NextFunction } from 'express';

export default interface IPackagingController {
  createPackaging(req: Request, res: Response, next: NextFunction);
  getPackaging(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
  getAllPackaging(req: Request, res: Response, next: NextFunction);
}
