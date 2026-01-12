import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-button',
  imports: [AsyncPipe],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss'
})
export class CartButtonComponent {
  private cart = inject(CartService);

  cartCount$: Observable<number> = this.cart.count$;

  toggle() {
    this.cart.togglePanel();
  }
}