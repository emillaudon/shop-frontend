import { Component } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { NavbarTextButtonComponent } from '../navbar-text-button/navbar-text-button.component';
import { CartButtonComponent } from "../cart-button/cart-button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchFieldComponent, NavbarTextButtonComponent, CartButtonComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
