import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-field',
  imports: [FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {
  @Output() query = new EventEmitter<string>();
  private router = inject(Router);

  private sub = new Subscription();

  value = '';

  constructor() {
    this.sub.add(
      this.router.events.pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),

        filter(e => e.navigationTrigger === 'popstate')
      ).subscribe(() => {
        this.clear()
      })
    );
  }

  submit() {
    this.query.emit(this.value.trim());
  }

  clear() {
    this.value = '';
    this.query.emit('');
  }

}
