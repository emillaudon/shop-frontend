import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() search = new EventEmitter<string>();
  private sub = new Subscription();

  value = '';

  constructor(private router: Router) {
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
    this.search.emit(this.value.trim());
  }

  clear() {
    this.value = '';
    this.search.emit('');
  }

}
