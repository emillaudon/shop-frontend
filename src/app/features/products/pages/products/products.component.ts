import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { AsyncPipe } from '@angular/common';
import { catchError, distinctUntilChanged, map, merge, Observable, of, startWith, Subject, Subscription, switchMap, withLatestFrom } from 'rxjs';
import { CartPanelComponent } from '../../../cart/components/cart-panel/cart-panel.component';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../data-access/product.service';
import { CartService } from '../../../cart/data-access/cart.service';
import { Vm } from '../../../../shared/state/view-model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CartPanelComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit, OnDestroy, OnInit {
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
  
  private reload$ = new Subject<void>();
  vm$!: Observable<Vm<Product[]>>;
 
  private sub = new Subscription();

  products$!: Observable<Product[]>;

  trackById = (_: number, p: Product) => p.id;
  private cart = inject(CartService);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  cartOpen$: Observable<boolean> = this.cart.isOpen$;
  
  onAddToCart(product: Product) {
    this.cart.add(product, 1);
  }

  reload() {
    this.reload$.next();
  }

  ngOnInit() {
    const query$ = this.route.queryParamMap.pipe(
      map(params => (params.get('query') ?? '').trim()),
      distinctUntilChanged()
    );

    const trigger$ = merge(
      query$,
      this.reload$.pipe(
        withLatestFrom(query$),
        map(([, q]) => q)
      )
    );

    this.vm$ = trigger$.pipe(
      switchMap(p => 
        (p ? this.productService.search(p) : this.productService.getAllProducts()).pipe(
          map(data => ({ loading: false, data })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      )
    );
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

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateHeightOfCart() {
    const el = this.panelRef?.nativeElement;
    if(!el) return;
    const rectTop = el.getBoundingClientRect().top;
    const vh = window.innerHeight;

    const available = Math.max(0, Math.min(vh, vh - rectTop));

    el.style.setProperty('--panel-h', `${available}px`)

  }
}
