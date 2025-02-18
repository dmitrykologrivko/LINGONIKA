import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check if the request is for an API route
    if (request.url.startsWith('/api')) {
      // Return a JSON response for API 404s
      response.status(404).json({
        statusCode: 404,
        message: `Cannot ${request.method} ${request.url}`,
        error: 'Not Found',
      });
    } else {
      // Serve the SPA `index.html` for non-API 404s
      const filePath = join(process.cwd(), 'public', 'index.html');
      response.sendFile(filePath);
    }
  }
}
