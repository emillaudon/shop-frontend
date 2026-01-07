import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-text-button',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-text-button.component.html',
  styleUrl: './navbar-text-button.component.scss'
})
export class NavbarTextButtonComponent {
  @Input() label = "Load";
  @Input() to = '/';
}
