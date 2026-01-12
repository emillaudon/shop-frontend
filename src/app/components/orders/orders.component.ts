import { Component, inject, OnInit } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderCardComponent, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
private orderService = inject(OrderService);
orders$!: Observable<Order[]>;


  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }
}
