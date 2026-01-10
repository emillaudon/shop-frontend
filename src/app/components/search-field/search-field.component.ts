import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  imports: [FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {
  @Output() search = new EventEmitter<string>();
  value = '';

  submit() {
    this.search.emit(this.value.trim());
  }

  clear() {
    this.value = '';
    this.search.emit('');
  }

}
