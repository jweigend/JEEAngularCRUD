import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { DiscountCodeService } from '../../core/services/discount-code.service';
import { MicroMarketService } from '../../core/services/micro-market.service';
import { Customer } from '../../core/models/customer.model';
import { DiscountCode } from '../../core/models/discount-code.model';
import { MicroMarket } from '../../core/models/micro-market.model';

// Unified Create/Edit component — the route parameter :id determines the mode.
// If an ID is present, it loads the existing customer (edit mode); otherwise it's create mode.
// Migration note: The original 2014 version had separate controllers for create and edit.
@Component({
  selector: 'app-customer-detail',
  standalone: true,
  // FormsModule enables template-driven forms (ngModel, ngSubmit).
  // In standalone components, each dependency must be explicitly imported here.
  imports: [FormsModule],
  template: `
    <h1>{{ editMode() ? 'Edit Customer' : 'Create Customer' }}</h1>
    <form (ngSubmit)="save()" class="mt-3">
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label" for="name">Name</label>
          <input class="form-control" id="name" [(ngModel)]="customer.name"
                 name="name" maxlength="30" required>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="email">Email</label>
          <input class="form-control" id="email" [(ngModel)]="customer.email"
                 name="email" type="email" maxlength="40">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label" for="addressline1">Address Line 1</label>
          <input class="form-control" id="addressline1" [(ngModel)]="customer.addressline1"
                 name="addressline1" maxlength="30">
        </div>
        <div class="col-md-6">
          <label class="form-label" for="addressline2">Address Line 2</label>
          <input class="form-control" id="addressline2" [(ngModel)]="customer.addressline2"
                 name="addressline2" maxlength="30">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label" for="city">City</label>
          <input class="form-control" id="city" [(ngModel)]="customer.city"
                 name="city" maxlength="25">
        </div>
        <div class="col-md-2">
          <label class="form-label" for="state">State</label>
          <input class="form-control" id="state" [(ngModel)]="customer.state"
                 name="state" maxlength="2">
        </div>
        <div class="col-md-3">
          <label class="form-label" for="phone">Phone</label>
          <input class="form-control" id="phone" [(ngModel)]="customer.phone"
                 name="phone" maxlength="12">
        </div>
        <div class="col-md-3">
          <label class="form-label" for="fax">Fax</label>
          <input class="form-control" id="fax" [(ngModel)]="customer.fax"
                 name="fax" maxlength="12">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label" for="creditLimit">Credit Limit</label>
          <input class="form-control" id="creditLimit" [(ngModel)]="customer.creditLimit"
                 name="creditLimit" type="number">
        </div>
        <div class="col-md-4">
          <label class="form-label" for="discountCode">Discount Code</label>
          <select class="form-select" id="discountCode" [(ngModel)]="selectedDiscountCode"
                  name="discountCode" required>
            @for (dc of discountCodes(); track dc.discountCode) {
              <option [value]="dc.discountCode">{{ dc.discountCode }} ({{ dc.rate }}%)</option>
            }
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="zip">Zip Code (Market)</label>
          <select class="form-select" id="zip" [(ngModel)]="selectedZipCode"
                  name="zip" required>
            @for (mm of microMarkets(); track mm.zipCode) {
              <option [value]="mm.zipCode">{{ mm.zipCode }}</option>
            }
          </select>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary" type="submit">Save</button>
        <button class="btn btn-secondary" type="button" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `
})
export class CustomerDetailComponent implements OnInit {
  // inject() — the modern Angular DI approach (since Angular 14).
  // All five dependencies are injected as class fields rather than constructor parameters.
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private discountCodeService = inject(DiscountCodeService);
  private microMarketService = inject(MicroMarketService);

  editMode = signal(false);
  customer: Customer = {};
  discountCodes = signal<DiscountCode[]>([]);
  microMarkets = signal<MicroMarket[]>([]);
  // Flat string values for the <select> dropdowns — Angular's ngModel binds to primitives,
  // not nested objects. We reconstruct the objects in save().
  selectedDiscountCode = '';
  selectedZipCode = '';

  // OnInit lifecycle hook — called once after the component is initialized.
  // Loads dropdown data and (in edit mode) the existing customer.
  ngOnInit(): void {
    this.discountCodeService.findAll().subscribe(d => this.discountCodes.set(d));
    this.microMarketService.findAll().subscribe(m => this.microMarkets.set(m));

    // ActivatedRoute.snapshot provides the route parameters at the time of navigation.
    // The +id converts the string parameter to a number.
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode.set(true);
      this.customerService.findById(+id).subscribe(c => {
        this.customer = c;
        this.selectedDiscountCode = c.discountCode?.discountCode ?? '';
        this.selectedZipCode = c.zip?.zipCode ?? '';
      });
    }
  }

  save(): void {
    // Reconstruct the nested objects from the flat dropdown values.
    // The backend expects { discountCode: { discountCode: "H" } } — JPA resolves the
    // full entity by its primary key during merge/persist.
    this.customer.discountCode = { discountCode: this.selectedDiscountCode };
    this.customer.zip = { zipCode: this.selectedZipCode };

    if (this.editMode()) {
      this.customerService.update(this.customer.customerId!, this.customer)
        .subscribe(() => this.router.navigate(['/customers']));
    } else {
      this.customerService.create(this.customer)
        .subscribe(() => this.router.navigate(['/customers']));
    }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
