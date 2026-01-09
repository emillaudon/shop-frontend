import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';

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

  constructor(private cart: CartService){
    this.items$ = this.cart.items$;
    this.total$ = this.cart.total$;
    this.itemCount$ = this.cart.count$;
  }
}
