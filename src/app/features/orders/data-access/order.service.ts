import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { OrderItem } from '../../cart/models/order-item';
import { CreateOrderItemRequest, Order, OrderDto } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  getAllOrders() {
    return this.http.get<OrderDto[]>('/api/orders').pipe(
      delay(2000), // ⏱ 2 sek fejk-laddning
      map((dtos) =>
        dtos.map(
          (dto) =>
            new Order(
              dto.id,
              dto.createdAt,
              dto.status,
              dto.items.map(
                (i) => new OrderItem(i.productId, i.quantity, i.unitPrice)
              )
            )
        )
      )
    );

    return this.http.get<OrderDto[]>('/api/orders').pipe(
      map((dtos) =>
        dtos.map(
          (dto) =>
            new Order(
              dto.id,
              dto.createdAt,
              dto.status,
              dto.items.map(
                (i) => new OrderItem(i.productId, i.quantity, i.unitPrice)
              )
            )
        )
      )
    );
  }

  createOrder(items: CreateOrderItemRequest[]): Observable<OrderDto> {
    return this.http.post<OrderDto>('/api/orders', { items });
  }
}
