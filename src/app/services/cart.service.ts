import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  readonly count$ = this.items$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  add(product: Product, qty: number = 1) {
    const items = this.itemsSubject.value;
    const existing = items.find(i => i.productId === product.id);

    if (existing) {
      const updated = items.map(i => 
        i.productId === product.id
        ? { ...i, quantity: i.quantity + qty }
        : i
      );
      this.itemsSubject.next(updated);
      return;
    }

    this.itemsSubject.next([
      ...items,
      { productId: product.id, name: product.name, price: product.price, quantity: qty }
    ]);
  };

  clear() {
    this.itemsSubject.next([]);
  }
}
