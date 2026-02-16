import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer.model';

// Standalone component — no NgModule required. Each component declares its own dependencies
// via the 'imports' array. This is the Angular 19 default and replaces NgModule-based architecture.
@Component({
  selector: 'app-customer-list',
  // standalone: true is the default in Angular 19, shown explicitly here for clarity.
  standalone: true,
  // Inline template — keeps component, template, and logic in a single file.
  // For larger templates, use a separate .html file via templateUrl.
  template: `
    <h1>Customers</h1>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Email</th>
          <th>Credit Limit</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        @for (customer of customers(); track customer.customerId) {
          <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.creditLimit }}</td>
            <td>
              <button class="btn btn-sm btn-success"
                      (click)="editCustomer(customer.customerId!)">Edit</button>
            </td>
            <td>
              <button class="btn btn-sm btn-danger"
                      (click)="deleteCustomer(customer.customerId!)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
    <button class="btn btn-primary" (click)="createCustomer()">
      Create New Customer
    </button>
  `
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  // Angular Signal: a reactive primitive that notifies the template when its value changes.
  // Unlike AngularJS's $scope (which relied on dirty-checking), Signals provide fine-grained
  // reactivity — only the DOM nodes bound to this signal are re-rendered on change.
  customers = signal<Customer[]>([]);

  constructor() {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.findAll().subscribe(data => this.customers.set(data));
  }

  createCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customers', id]);
  }

  // subscribe() triggers the HTTP DELETE, then reloads the list on success.
  // The Observable from HttpClient is "cold" — the request is only sent when subscribed to.
  deleteCustomer(id: number): void {
    this.customerService.delete(id).subscribe(() => this.loadCustomers());
  }
}
