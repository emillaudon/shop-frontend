import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-text-button',
  imports: [],
  templateUrl: './navbar-text-button.component.html',
  styleUrl: './navbar-text-button.component.scss'
})
export class NavbarTextButtonComponent {
  @Input() label = "Load";
}
