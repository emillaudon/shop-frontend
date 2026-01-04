import { Component } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { NavbarTextButtonComponent } from '../navbar-text-button/navbar-text-button.component';

@Component({
  selector: 'app-navbar',
  imports: [SearchFieldComponent, NavbarTextButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
