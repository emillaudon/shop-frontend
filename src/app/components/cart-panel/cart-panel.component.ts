import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CreateOrderItemRequest } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-panel',
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  itemCount$: Observable<number>;

  constructor(private cart: CartService, private orderService: OrderService){
    this.items$ = this.cart.items$;
    this.total$ = this.cart.total$;
    this.itemCount$ = this.cart.count$;
  }

  decreaseQuantityOf(productId: number) {
    this.cart.decreaseAmount(productId);
  }

  increaseQuantityOf(prodctId: number) {
    this.cart.increaseAmount(prodctId);
  }

  async createOrder() {
    const cartItems = await firstValueFrom(this.cart.items$);

    const items: CreateOrderItemRequest[] = cartItems.map(i => ({
      productId: i.productId,
      quantity: i.quantity
    }));

    this.orderService.createOrder(items).subscribe({
      next: (order) => {
        this.cart.clear();
        this.cart.closePanel();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
