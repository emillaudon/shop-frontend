import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<Order[]>("api/orders");
  }
}
