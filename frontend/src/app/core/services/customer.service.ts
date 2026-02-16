import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../../environments/environment';

// @Injectable({ providedIn: 'root' }) registers this service as a singleton in the root injector.
// No need to add it to a module's providers array — Angular tree-shakes unused services automatically.
//
// Migration note: AngularJS 1.x used $resource for REST calls. Angular's HttpClient returns
// typed Observables (RxJS), enabling reactive patterns like .pipe(map, catchError, retry).
@Injectable({ providedIn: 'root' })
export class CustomerService {
  // inject() is the modern alternative to constructor injection.
  // Instead of: constructor(private http: HttpClient) {}
  // This works in standalone components and allows use outside constructors.
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/customers`;

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(customer: Customer): Observable<void> {
    return this.http.post<void>(this.baseUrl, customer);
  }

  update(id: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
