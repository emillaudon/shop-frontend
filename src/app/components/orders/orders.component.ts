import { Component } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderCardComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
orders$!: Observable<Order[]>;

constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }
}
