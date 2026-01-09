import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartPanelComponent } from '../cart-panel/cart-panel.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CartPanelComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  @ViewChild('panel')
  set panel(ref: ElementRef<HTMLElement>) {
    this.panelRef = ref;

    if(ref) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.updateHeightOfCart());
      });
    }
  }
 
  private sub = new Subscription();

  products$!: Observable<Product[]>;
  productssss: Product[] = [
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
  cartOpen$!: Observable<boolean>;
  
  constructor(private cart: CartService, private productService: ProductService) {
    this.cartOpen$ = this.cart.isOpen$;
  }
  
  

  onAddToCart(product: Product) {
    this.cart.add(product, 1);
  }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }

  ngAfterViewInit() {
    this.sub.add(
      this.cart.isOpen$.subscribe(() => {
        requestAnimationFrame(() => this.updateHeightOfCart());
      })
    );

    requestAnimationFrame(() => this.updateHeightOfCart());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize')
  updateHeightOfCart() {
    const el = this.panelRef?.nativeElement;
    if(!el) return;
    const rectTop = el.getBoundingClientRect().top;
    const vh = window.innerHeight;

    const available = Math.max(0, Math.min(vh, vh - rectTop));
    //const available = 6000;

    el.style.setProperty('--panel-h', `${available}px`)

  }
}
