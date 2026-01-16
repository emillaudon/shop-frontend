import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;

  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  onIncrease() {
    this.increase.emit(this.item.productId);
  }
  onDecrease() {
    this.decrease.emit(this.item.productId);
  }
}
