import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="p-4 mb-4 bg-light rounded-3">
      <div class="container-fluid py-3">
        <h1 class="display-5 fw-bold">Customer CRUD Demo</h1>
        <p class="col-md-8 fs-5">
          A single page application demonstrating Jakarta EE 10 REST backend
          with an Angular 19 frontend. Originally presented at JavaOne 2014,
          modernized for 2026.
        </p>
        <a class="btn btn-primary btn-lg" routerLink="/customers">
          View Customers
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <h2>Backend</h2>
        <p>Jakarta EE 10 with JAX-RS 3.1, CDI 4.0, JPA 3.1 and EclipseLink on Payara Micro 6.</p>
      </div>
      <div class="col-md-4">
        <h2>Frontend</h2>
        <p>Angular 19 with standalone components, signals, TypeScript and Bootstrap 5.</p>
      </div>
      <div class="col-md-4">
        <h2>Database</h2>
        <p>H2 embedded database with auto-generated schema and seed data.</p>
      </div>
    </div>
  `
})
export class HomeComponent {}
