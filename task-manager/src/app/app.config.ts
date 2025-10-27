import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import { routes } from './app.routes';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/authorize-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEventPlugins(),
    provideHttpClient(withInterceptors([authInterceptor])),
    NG_EVENT_PLUGINS
  ]
};

