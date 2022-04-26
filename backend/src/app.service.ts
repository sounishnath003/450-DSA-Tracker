import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  description(ip: string) {
    return {
      ip,
      apiname: '450-dsa-api',
      version: 'v2.0.2',
      description: 'A redesigned and complete rewrite of existing API',
      timestamp: Date.now(),
    };
  }
}
