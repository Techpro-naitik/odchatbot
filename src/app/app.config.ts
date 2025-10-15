import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthServiceService } from './service/auth-service.service';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownPipe } from './pipe/markdown.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthServiceService,
   
    provideHttpClient()
  ]
};
