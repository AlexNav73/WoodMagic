import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { routes } from "./app.routes";

import { authInterceptor } from "./interceptors/auth.interceptor";

import { reducers } from "./store/app.states";
import { AuthEffects } from "./store/effects/auth.effects";
import { CatalogEffects } from "./store/effects/catalog.effects";
import { ProductEffects } from "./store/effects/product.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(reducers),
    provideEffects(AuthEffects, CatalogEffects, ProductEffects),
  ],
};
