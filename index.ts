import express, { Express, Request, Response } from 'express';
import { connectToDB } from './database/database';
import { UrlRouter } from './src/routes/url.route';
import { UrlDao } from './src/dao/url.dao';
import { UrlService } from './src/service/url.service';
import { UrlController } from './src/controller/url.controller';

(async function startServer(port: number) {
  const app = express();

  app.use(express.json());

  // Connect to DB
  const DB = await connectToDB();

  // Setup routes
  const urlDao = new UrlDao(DB);
  const urlService = new UrlService(urlDao);
  const urlController = new UrlController(urlService);
  const urlRouter = new UrlRouter(urlController);
  app.use('/url', urlRouter.getRouter());

  // Start server
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
})(3000);
