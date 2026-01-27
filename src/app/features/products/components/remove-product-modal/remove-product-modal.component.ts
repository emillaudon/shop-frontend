import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-product-modal',
  imports: [],
  templateUrl: './remove-product-modal.component.html',
  styleUrl: './remove-product-modal.component.scss',
})
export class RemoveProductModalComponent {
  @Input({ required: true }) product!: string;

  @Output() closeSelf = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();

  onBackDropClicked(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;
    this.closeSelf.emit();
  }

  onClickYes() {
    this.deleteItem.emit();
  }

  onClickCancel() {
    this.closeSelf.emit();
  }
}
