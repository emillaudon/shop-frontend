import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { OrderService } from '../../../orders/data-access/order.service';
import { CartService } from '../../data-access/cart.service';
import { Vm } from '../../../../shared/state/view-model';
import { AppError } from '../../../../core/http/models/app-error';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-panel',
  imports: [AsyncPipe, ErrorStateComponent, CartItemComponent],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss',
})
export class CartPanelComponent implements OnInit {
  private cart = inject(CartService);
  private orderService = inject(OrderService);

  items$: Observable<CartItem[]> = this.cart.items$;
  total$: Observable<number> = this.cart.total$;
  itemCount$: Observable<number> = this.cart.count$;

  private submit$ = new Subject<void>();
  submitVm$!: Observable<Vm<void>>;

  ngOnInit() {
    this.submitVm$ = this.submit$.pipe(
      withLatestFrom(this.items$),
      switchMap(([, cartItems]) => {
        const items = cartItems.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        }));

        return this.orderService.createOrder(items).pipe(
          tap(() => {
            this.cart.clear();
            this.cart.closePanel();
          }),
          map(() => ({ loading: false })),
          startWith({ loading: true }),
          catchError((error: AppError) => of({ loading: false, error }))
        );
      }),
      startWith({ loading: false })
    );
  }

  decreaseQuantityOf(productId: number) {
    this.cart.decreaseAmount(productId);
  }

  increaseQuantityOf(productId: number) {
    this.cart.increaseAmount(productId);
  }

  createOrder() {
    this.submit$.next();
  }
}
