import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Angular 19 "standalone" bootstrap — no NgModule needed.
// Each provide*() function registers a core capability. This replaces the traditional
// AppModule with its @NgModule({ imports: [...], providers: [...] }) decorator.
export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js change detection with event coalescing (batches multiple events into one CD cycle).
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Registers the router with lazy-loaded routes defined in app.routes.ts.
    provideRouter(routes),
    // Enables HttpClient for all services — equivalent to the old HttpClientModule import.
    provideHttpClient()
  ]
};
