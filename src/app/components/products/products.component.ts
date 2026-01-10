import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { distinctUntilChanged, map, Observable, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartPanelComponent } from '../cart-panel/cart-panel.component';
import { ActivatedRoute } from '@angular/router';

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

  product = new Product(1, "T-Shirt", 4, 10);
  trackById = (_: number, p: Product) => p.id;
  cartOpen$!: Observable<boolean>;
  
  constructor(
    private cart: CartService, 
    private productService: ProductService,
    private route: ActivatedRoute
    ) {
    this.cartOpen$ = this.cart.isOpen$;
  }
  
  onAddToCart(product: Product) {
    this.cart.add(product, 1);
  }

  ngOnInit() {
    this.products$ = this.route.queryParamMap.pipe(
      map(params => (params.get('query') ?? '').trim()),
      distinctUntilChanged(),
      switchMap(q => q ? this.productService.search(q) : this.productService.getAllProducts())
    );

    //this.products$ = this.productService.getAllProducts();
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
