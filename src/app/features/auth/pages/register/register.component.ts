import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  errorMessage = '';
  onSubmit() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.authService.login(this.email, this.password).subscribe({
          next: () => this.router.navigateByUrl('/'),
        });
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
