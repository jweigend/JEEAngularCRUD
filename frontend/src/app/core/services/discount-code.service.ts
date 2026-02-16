import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscountCode } from '../models/discount-code.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DiscountCodeService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/discount-codes`;

  findAll(): Observable<DiscountCode[]> {
    return this.http.get<DiscountCode[]>(this.baseUrl);
  }
}
