import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products').pipe(delay(1000));
    return this.http.get<Product[]>('/api/products');
  }

  search(query: string): Observable<Product[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Product[]>('/api/products', { params });
  }
}
