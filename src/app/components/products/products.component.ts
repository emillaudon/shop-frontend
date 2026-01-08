import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    new Product(2, "Other Shirt", 10, 10),
    new Product(3, "Placeholder", 4, 4),
    new Product(4, "Also Placeholder", 10,10),
    new Product(5, "Also Placeholder 2", 11,11),
    new Product(6, "Other Shirt", 10, 10),
    new Product(7, "Placeholder", 4, 4),
    new Product(8, "Also Placeholder", 10,10),
    new Product(9, "Also Placeholder 2", 11,11),

  ];
  product = new Product(1, "T-Shirt", 4, 10);
  trackById = (_: number, p: Product) => p.id;
}
