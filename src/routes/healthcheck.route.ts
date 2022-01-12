import { Router, Request, Response } from 'express';
class HealthCheckRouter {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/healthcheck', (req: Request, res: Response) => {
      res.status(200).json({ health: "TRACKING api's up on runing" })
    });
  }
}

export default HealthCheckRouter;