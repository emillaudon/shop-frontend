import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

interface TokenResponse {
  token: string;
}
interface AuthRequest {
  email: string;
  password: string;
}

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );

  readonly token$ = this.tokenSubject.asObservable();
  readonly isLoggedIn$ = this.token$.pipe(map((t) => !!t));

  getTokenSnapshot(): string | null {
    return this.tokenSubject.value;
  }

  register(email: string, password: string) {
    const body: AuthRequest = { email, password };
    return this.http.post<void>('/api/auth/register', body);
  }

  login(email: string, password: string) {
    const body: AuthRequest = { email, password };
    return this.http
      .post<TokenResponse>('/api/auth/login', body)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  logout() {
    this.setToken(null);
  }

  isTokenExpired(token: string): boolean {
    try {
      const [, payLoadBase64] = token.split('.');
      const payloadJson = atob(
        payLoadBase64.replace(/-/g, '+').replace(/_/g, '/'),
      );
      const payload = JSON.parse(payloadJson);

      const exp = payload?.exp;
      if (!exp) {
        this.logout();
        return true;
      }

      const now = Math.floor(Date.now() / 1000);
      return exp <= now;
    } catch {
      this.logout();
      return true;
    }
  }

  private setToken(token: string | null) {
    this.tokenSubject.next(token);
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }
}
