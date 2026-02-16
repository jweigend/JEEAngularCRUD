import { Routes } from '@angular/router';

// Lazy-loaded routes: each loadComponent() triggers a dynamic import(), so the browser
// only downloads a component's code when the user navigates to that route.
// Migration note: AngularJS 1.x used ngRoute with eager loading of all controllers.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customer-list/customer-list.component')
      .then(m => m.CustomerListComponent)
  },
  // Important: 'customers/new' must come before 'customers/:id', otherwise Angular
  // would match "new" as an :id parameter.
  {
    path: 'customers/new',
    loadComponent: () => import('./features/customer-detail/customer-detail.component')
      .then(m => m.CustomerDetailComponent)
  },
  {
    path: 'customers/:id',
    loadComponent: () => import('./features/customer-detail/customer-detail.component')
      .then(m => m.CustomerDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
