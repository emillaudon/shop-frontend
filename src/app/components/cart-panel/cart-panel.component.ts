import { AsyncPipe} from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CreateOrderItemRequest } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-panel',
  imports: [AsyncPipe],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  private cart = inject(CartService);
  private orderService = inject(OrderService);

  items$: Observable<CartItem[]> = this.cart.items$;
  total$: Observable<number> = this.cart.total$;
  itemCount$: Observable<number> = this.cart.count$;

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
      next: () => {
        this.cart.clear();
        this.cart.closePanel();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
