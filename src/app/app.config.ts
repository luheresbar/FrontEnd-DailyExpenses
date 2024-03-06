import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
  ],
  
};
