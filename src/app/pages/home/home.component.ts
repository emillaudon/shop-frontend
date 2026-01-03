import { Component } from '@angular/core';
import { LoadButtonComponent } from "../../components/load-button/load-button.component";
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadButtonComponent,NavbarComponent, NgIf, NgForOf, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products$?: Observable<Product[]>;
  orders$?: Observable<Order[]>;
  constructor(private productService: ProductService, private orderService: OrderService) {}

  onLoadProducts() {
    this.products$ = this.productService.getAllProducts();
  }

  onLoadOrders() {
    this.orders$ = this.orderService.getAllOrders();
  }
} 
