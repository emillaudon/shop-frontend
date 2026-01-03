import { Component } from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
  selector: 'app-navbar',
  imports: [SearchFieldComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
