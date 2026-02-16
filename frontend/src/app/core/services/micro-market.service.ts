import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MicroMarket } from '../models/micro-market.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MicroMarketService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/micro-markets`;

  findAll(): Observable<MicroMarket[]> {
    return this.http.get<MicroMarket[]>(this.baseUrl);
  }
}
