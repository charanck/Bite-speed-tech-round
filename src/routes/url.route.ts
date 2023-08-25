import { Router, Request, Response } from 'express';
import { UrlController } from '../controller/url.controller';

export class UrlRouter {
  constructor(private urlController: UrlController) {}

  getRouter(): Router {
    const urlRouter = Router();

    urlRouter.post('/', async (request: Request, response: Response) => {
      await this.urlController.createShortUrl(request, response);
    });

    urlRouter.get(
      '/:short_code',
      async (request: Request, response: Response) => {
        await this.urlController.getRedirectUrl(request, response);
      }
    );
    return urlRouter;
  }
}
