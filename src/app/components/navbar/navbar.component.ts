import { Component } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { NavbarTextButtonComponent } from '../navbar-text-button/navbar-text-button.component';
import { CartButtonComponent } from "../cart-button/cart-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchFieldComponent, NavbarTextButtonComponent, CartButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onSearch(text: string) {
    if(!text) {
      this.router.navigate(['/products']);
      return;
    }

    this.router.navigate(['/products'], { queryParams: { query: text }});
  }
}
