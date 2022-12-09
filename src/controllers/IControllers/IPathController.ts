import { Request, Response, NextFunction } from 'express';

export default interface IPathController {
  createPath(req: Request, res: Response, next: NextFunction);
  getPath(req: Request, res: Response, next: NextFunction);
  getPathByName(req: Request, res: Response, next: NextFunction);
  updatePath(req: Request, res: Response, next: NextFunction);
  getAllPath(req: Request, res: Response, next: NextFunction);
}
