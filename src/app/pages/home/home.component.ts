import { Component } from '@angular/core';
import { LoadProductsButtonComponent } from "../../components/load-products-button/load-products-button.component";
import { ProductService } from '../../services/product.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadProductsButtonComponent, NgIf, NgForOf, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products$?: Observable<Product[]>
  constructor(private productService: ProductService) {}

  onLoadProducts() {
    this.products$ = this.productService.getAllProducts();
  }
} 
