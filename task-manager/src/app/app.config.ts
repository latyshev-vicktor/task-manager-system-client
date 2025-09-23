import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import { routes } from './app.routes';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEventPlugins(),
    provideHttpClient(),
    NG_EVENT_PLUGINS
  ]
};

