import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Root component — the application shell with navigation and <router-outlet>.
// RouterOutlet renders the matched route component; RouterLink/RouterLinkActive handle navigation.
// Migration note: AngularJS 1.x used ng-view for routing. Angular's <router-outlet> is the equivalent.
@Component({
  selector: 'app-root',
  standalone: true,
  // Each directive/component used in the template must be explicitly imported.
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <nav class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h3 class="mb-0">Customer CRUD</h3>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" routerLink="/" routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: true}">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/customers"
               routerLinkActive="active">Customers</a>
          </li>
        </ul>
      </nav>
      <router-outlet />
      <footer class="text-center text-muted border-top pt-3 mt-4">
        <p>Customer CRUD Demo &mdash; Jakarta EE 10 + Angular 19</p>
      </footer>
    </div>
  `
})
export class AppComponent {}
