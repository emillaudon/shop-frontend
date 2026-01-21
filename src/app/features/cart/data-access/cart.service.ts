import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../../products/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  private readonly openSubject = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this.openSubject.asObservable();

  togglePanel() {
    this.openSubject.next(!this.openSubject.value);
  }

  openPanel() {
    this.openSubject.next(true);
  }

  closePanel() {
    this.openSubject.next(false);
  }

  readonly count$ = this.items$.pipe(
    map((items) => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  readonly total$ = this.items$.pipe(
    map((items) => items.reduce((sum, i) => sum + i.quantity * i.price, 0))
  );

  getItemsSnapshot() {
    return this.itemsSubject.value;
  }

  add(product: Product, qty = 1) {
    const items = this.itemsSubject.value;
    const existing = items.find((i) => i.productId === product.id);

    if (existing) {
      const updated = items.map((i) =>
        i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
      );
      this.itemsSubject.next(updated);
      return;
    }

    this.itemsSubject.next([
      ...items,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        imageUrl: product.imageUrl ?? null,
      },
    ]);
  }

  decreaseAmount(productId: number) {
    const items = this.itemsSubject.value;

    const updated = items
      .map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    this.itemsSubject.next(updated);
  }

  increaseAmount(productId: number) {
    const items = this.itemsSubject.value;

    const updated = items.map((i) =>
      i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
    );
    this.itemsSubject.next(updated);
  }

  remove(productId: number) {
    const items = this.itemsSubject.value;

    const updated = items.filter((i) => i.productId !== productId);

    this.itemsSubject.next(updated);
  }

  clear() {
    this.itemsSubject.next([]);
  }
}
