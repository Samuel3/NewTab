import { ApplicationConfig } from '@angular/core';
import { ConfigService } from './services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [ConfigService],
};
