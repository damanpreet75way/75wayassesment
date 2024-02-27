import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
