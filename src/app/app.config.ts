import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth } from './components/interceptors/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth(),
  ]
};
