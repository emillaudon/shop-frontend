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

interface JwtPayload {
  sub?: string;
  role?: Role;
  exp?: number;
  iat?: number;
}

type Role = 'USER' | 'ADMIN';

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

  readonly payload$ = this.token$.pipe(
    map((t) => (t ? this.getPayloadFromJwt(t) : null)),
  );

  readonly email$ = this.payload$.pipe(map((p) => p?.sub ?? null));

  readonly role$ = this.payload$.pipe(map((p) => p?.role ?? null));

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
    const payload = this.getPayloadFromJwt(token);
    const exp = payload?.exp;

    if (typeof exp !== 'number') {
      this.logout();
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    const expired = exp <= now;

    if (expired) this.logout();
    return expired;
  }

  private setToken(token: string | null) {
    this.tokenSubject.next(token);
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  private getPayloadFromJwt(token: string): JwtPayload | null | undefined {
    try {
      const payloadPart = token.split('.')[1];

      if (!payloadPart) return null;

      const json = this.base64UrlDecode(payloadPart);
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }

  private base64UrlDecode(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const pad = base64.length % 4;
    if (pad) base64 += '='.repeat(4 - pad);

    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

    return new TextDecoder().decode(bytes);
  }
}
