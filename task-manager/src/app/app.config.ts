import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import { routes } from './app.routes';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/authorize-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RealtimeService } from './services/real-time-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEventPlugins(),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    NG_EVENT_PLUGINS,
    {
      provide: APP_INITIALIZER,
      useFactory: (rt: RealtimeService) => () => rt.connect(),
      deps: [RealtimeService],
      multi: true
    }
  ]
};

