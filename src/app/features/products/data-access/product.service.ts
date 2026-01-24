import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';

export interface CreateProductRequest {
  name: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products').pipe(delay(1000));
  }

  search(query: string): Observable<Product[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Product[]>('/api/products', { params });
  }

  createProduct(body: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>('/api/products', body);
  }

  uploadProductImage(productId: number, file: File): Observable<Product> {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post<Product>(`/api/products/${productId}/image`, fd);
  }
}
