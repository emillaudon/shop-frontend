import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderItemRequest, Order, OrderDto } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<Order[]>("api/orders");
  }

  createOrder(items: CreateOrderItemRequest[]): Observable<OrderDto> {
    return this.http.post<OrderDto>('/api/orders', { items });
  }
}
