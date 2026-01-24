import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CreateProductPayload {
  name: string;
  quantity: number;
  price: number;
  imageFile: File | null;
}

@Component({
  selector: 'app-create-product-modal',
  imports: [FormsModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.scss',
})
export class CreateProductModalComponent {
  @Output() closeSelf = new EventEmitter<void>();
  @Output() submitCreate = new EventEmitter<CreateProductPayload>();

  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  name = '';
  quantity = 0;
  price = 0;

  onBackDropClicked() {
    this.cleanUpPreview();
    this.closeSelf.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedFile = file;
    this.imagePreviewUrl = URL.createObjectURL(file);
  }

  onSubmit() {
    if (!this.name.trim()) return;
    if (this.quantity == null || this.quantity < 1) return;
    if (this.price == null || this.price < 1) return;

    this.submitCreate.emit({
      name: this.name.trim(),
      quantity: this.quantity,
      price: this.price,
      imageFile: this.selectedFile,
    });
  }

  @HostListener('document:keydown.escape')
  onEscPressed() {
    this.onBackDropClicked();
  }

  private cleanUpPreview() {
    if (this.imagePreviewUrl) URL.revokeObjectURL(this.imagePreviewUrl);
    this.imagePreviewUrl = null;
  }
}
