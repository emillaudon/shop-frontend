import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-load-products-button',
  imports: [],
  templateUrl: './load-button.component.html',
  styleUrl: './load-button.component.scss'
})
export class LoadButtonComponent {
  @Output() load = new EventEmitter<void>();
  @Input() label = "Load";

  onClick() {
    this.load.emit();
  }
}
