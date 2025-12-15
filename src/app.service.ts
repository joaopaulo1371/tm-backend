import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'TM Digital - CRM Agrícola API';
  }
}
