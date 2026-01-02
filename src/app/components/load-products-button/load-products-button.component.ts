import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-products-button',
  imports: [],
  templateUrl: './load-products-button.component.html',
  styleUrl: './load-products-button.component.scss'
})
export class LoadProductsButtonComponent {
  @Output() load = new EventEmitter<void>();

  onClick() {
    this.load.emit();
  }
}
