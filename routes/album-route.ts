import { Request, Response, NextFunction } from 'express';
import Albums from '../models/album'; 

export class AlbumRoute {

    public AlbumRoute(app): void {
      app.route('/api/').get((req: Request, res: Response, next: NextFunction) => {
        Albums.find((err, albums) => {
          if (err) { return next(err); }
          res.json(albums);
        });
    });
    
    app.route('/api/:id').get((req: Request, res: Response, next: NextFunction) => {
        Albums.findById(req.params.id, (err, album) => {
          if (err) { return next(err); }
          res.json(album);
        });
      });
  
      app.route('/api/').post((req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        Albums.create(req.body, (err, album) => {
          if (err) { return next(err); }
          res.json(album);
        });
      });
  
      app.route('/api/:id').put((req: Request, res: Response, next: NextFunction) => {
        Albums.findByIdAndUpdate(req.params.id, req.body, (err, album) => {
          if (err) { return next(err); }
          res.json(album);
        });
      });
  
      app.route('/api/:id').delete((req: Request, res: Response, next: NextFunction) => {
        Albums.findByIdAndRemove(req.params.id, req.body, (err, album) => {
          if (err) { return next(err); }
          res.json(album);
        });
      });
    }
  }