import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
  }

  search(query: string): Observable<Product[]> {
    const params = new HttpParams().set('query', query);
    console.log(params);
    console.log(this.http.get<Product[]>('/api/products', { params }));
    return this.http.get<Product[]>('/api/products', { params });
  }
}
