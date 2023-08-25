import { UrlDao } from '../dao/url.dao';
import crypto from 'crypto';

export class UrlService {
  constructor(private urlDao: UrlDao) {}

  async getUrl(shortCode: string) {
    return this.urlDao.getUrl(shortCode);
  }

  async createUrl(url: string) {
    let retrys = 0;
    let hash: string = '';
    while (retrys < 5) {
      hash = crypto.randomBytes(6).toString('hex').substring(0, 6);
      const url = await this.urlDao.getUrl(hash);
      if (!url) {
        break;
      }
      retrys++;
    }
    if (retrys == 5) {
      throw new Error('retry_limit_reached');
    }
    await this.urlDao.createUrl({ redirectUrl: url, shortCode: hash });
    // Querying and getting it again as sqlite doesnt return creatd row
    return await this.urlDao.getUrl(hash);
  }
}
