import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderItemRequest, Order, OrderDto } from '../models/order';
import { map, Observable } from 'rxjs';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {

    return this.http.get<OrderDto[]>("/api/orders").pipe(
      map(dtos => dtos.map(dto => 
        new Order(
          dto.id,
          dto.createdAt,
          dto.status,
          dto.items.map(i => 
            new OrderItem(
              i.productId,
              i.quantity,
              i.unitPrice
            )
          )
        )
      ))
    );
  }

  createOrder(items: CreateOrderItemRequest[]): Observable<OrderDto> {
    return this.http.post<OrderDto>('/api/orders', { items });
  }
}
