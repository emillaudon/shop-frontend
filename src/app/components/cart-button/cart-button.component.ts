import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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