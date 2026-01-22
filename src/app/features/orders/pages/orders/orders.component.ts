import { Component, inject, OnInit } from '@angular/core';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { OrderService } from '../../data-access/order.service';
import { AsyncPipe } from '@angular/common';
import { Order } from '../../models/order';
import { Vm } from '../../../../shared/state/view-model';
import { AppError } from '../../../../core/http/models/app-error';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';

@Component({
  selector: 'app-orders',
  imports: [OrderCardComponent, AsyncPipe, ErrorStateComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  private reload$ = new Subject<void>();
  vm$!: Observable<Vm<Order[]>>;

  reload() {
    this.reload$.next();
  }

  ngOnInit() {
    this.vm$ = this.reload$.pipe(
      startWith(void 0),
      switchMap(() =>
        this.orderService.getMyOrders().pipe(
          map((data) => ({ loading: false, data })),
          startWith({ loading: true }),
          catchError((error: AppError) => of({ loading: false, error })),
        ),
      ),
    );
  }
}
