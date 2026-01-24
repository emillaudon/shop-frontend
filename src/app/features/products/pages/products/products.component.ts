import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../../models/product';
import { AsyncPipe } from '@angular/common';
import {
  catchError,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { CartPanelComponent } from '../../../cart/components/cart-panel/cart-panel.component';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../data-access/product.service';
import { CartService } from '../../../cart/data-access/cart.service';
import { Vm } from '../../../../shared/state/view-model';
import { AppError } from '../../../../core/http/models/app-error';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { AuthService } from '../../../auth/data-access/auth.service';
import {
  CreateProductModalComponent,
  CreateProductPayload,
} from '../../components/create-product-modal/create-product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    CartPanelComponent,
    AsyncPipe,
    ErrorStateComponent,
    CreateProductModalComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit, OnDestroy, OnInit {
  private auth = inject(AuthService);
  isAdmin$ = this.auth.role$.pipe(map((role) => role === 'ADMIN'));

  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  @ViewChild('panel')
  set panel(ref: ElementRef<HTMLElement>) {
    this.panelRef = ref;

    if (ref) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.updateHeightOfCart());
      });
    }
  }

  private reload$ = new Subject<void>();
  vm$!: Observable<Vm<Product[]>>;

  private sub = new Subscription();

  trackById = (_: number, p: Product) => p.id;
  private cart = inject(CartService);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  cartOpen$: Observable<boolean> = this.cart.isOpen$;
  isCreateModalOpen = false;

  onAddToCart(product: Product) {
    this.cart.add(product, 1);
    this.auth.role$.subscribe((r) => console.log('ROLE FROM JWT:', r));
  }

  onCreateProductClick() {
    this.openCreateProductModal();
  }

  openCreateProductModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateProductModal() {
    this.isCreateModalOpen = false;
  }

  handleCreateProduct(payload: CreateProductPayload) {
    const body = {
      name: payload.name,
      price: payload.price,
      stock: payload.quantity,
    };

    this.productService.createProduct(body).subscribe({
      next: (created) => {
        if (!payload.imageFile) {
          this.closeCreateProductModal();
          this.reload();
          return;
        }

        this.productService
          .uploadProductImage(created.id, payload.imageFile)
          .subscribe({
            next: () => {
              this.closeCreateProductModal();
              this.reload();
            },
          });
      },
    });
  }

  handleDeleteProduct(product: Product) {
    const deleteImage$ = product.imageUrl
      ? this.productService
          .deleteProductImage(product.id)
          .pipe(catchError(() => of(null)))
      : of(null);

    deleteImage$
      .pipe(switchMap(() => this.productService.deleteProduct(product.id)))
      .subscribe({
        next: () => this.reload(),
        error: (err: unknown) => console.error(err),
      });
  }

  reload() {
    this.reload$.next();
  }

  ngOnInit() {
    const query$ = this.route.queryParamMap.pipe(
      map((params) => (params.get('query') ?? '').trim()),
      distinctUntilChanged(),
    );

    const trigger$ = merge(
      query$,
      this.reload$.pipe(
        withLatestFrom(query$),
        map(([, q]) => q),
      ),
    );

    this.vm$ = trigger$.pipe(
      switchMap((p) =>
        (p
          ? this.productService.search(p)
          : this.productService.getAllProducts()
        ).pipe(
          map((data) => ({ loading: false, data })),
          startWith({ loading: true }),
          catchError((error: AppError) => of({ loading: false, error })),
        ),
      ),
    );
  }

  ngAfterViewInit() {
    this.sub.add(
      this.cart.isOpen$.subscribe(() => {
        requestAnimationFrame(() => this.updateHeightOfCart());
      }),
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
    if (!el) return;
    const rectTop = el.getBoundingClientRect().top;
    const vh = window.innerHeight;

    const available = Math.max(0, Math.min(vh, vh - rectTop));

    el.style.setProperty('--panel-h', `${available}px`);
  }
}
