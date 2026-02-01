import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/auth/data-access/auth.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  auth = inject(AuthService);

  isLoggedIn$ = this.auth.isLoggedIn$;
  userEmail = this.auth.email$;

  private userMenuOpen = new BehaviorSubject(false);
  isUserMenuOpen$ = this.userMenuOpen.asObservable();

  toggleUserDropdown() {
    this.userMenuOpen.next(!this.userMenuOpen.value);
  }

  logoutButtonClicked() {
    this.auth.logout();
    this.toggleUserDropdown();
  }
}
