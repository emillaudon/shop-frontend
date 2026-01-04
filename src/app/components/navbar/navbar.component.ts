import { Component } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { NavbarTextButtonComponent } from '../navbar-text-button/navbar-text-button.component';
import { CartButtonComponent } from "../cart-button/cart-button.component";

@Component({
  selector: 'app-navbar',
  imports: [SearchFieldComponent, NavbarTextButtonComponent, CartButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
