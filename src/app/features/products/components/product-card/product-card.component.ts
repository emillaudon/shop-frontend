import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-card',
  imports: [],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  @Input() canDelete = false;
  @Output() deleteProduct = new EventEmitter<Product>();

  onClick() {
    this.addToCart.emit(this.product);
  }

  onDeleteClick() {
    this.deleteProduct.emit(this.product);
  }
}
