import { Response, Request } from 'express';
import { UrlService } from '../service/url.service';

export class UrlController {
  constructor(private urlService: UrlService) {}

  async createShortUrl(request: Request, response: Response) {
    const requestPayload: createShortUrlRequestDto = request.body;
    if (!this._validateCreateShortUrlRequestDto(requestPayload)) {
      return response.status(400).json({ message: 'Invalid Url' });
    }
    try {
      const result = await this.urlService.createUrl(requestPayload.url);
      return response.status(200).json(result);
    } catch (err) {
      return response.status(500).send(err);
    }
  }

  async getRedirectUrl(request: Request, response: Response) {
    const shortCode = request.params['short_code'];
    if (!shortCode || String(shortCode).trim() === '') {
      response.status(400).json({ message: 'Invalid short code' });
    }
    const result: any = await this.urlService.getUrl(shortCode);
    if (!result) {
      response
        .status(404)
        .json({ message: 'url not found with the provided short code' });
    }
    return response.redirect(result['redirect_url']);
  }

  _validateCreateShortUrlRequestDto(
    requestPayload: createShortUrlRequestDto
  ): boolean {
    if (!requestPayload.url) return false;
    if (String(requestPayload).trim() === '') return false;
    return true;
  }
}

interface createShortUrlRequestDto {
  url: string;
}
