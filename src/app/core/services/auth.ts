import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signaux pour l'état de connexion et le rôle
  private loggedIn = signal<boolean>(false);
  private userRole = signal<'user' | 'admin' | null>(null);

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  isAdmin(): boolean {
    return this.userRole() === 'admin';
  }

  login(email: string, password: string): void {
    // Simulation simple pour le TP
    if (email === 'admin@test.com') {
      this.loggedIn.set(true);
      this.userRole.set('admin');
    } else {
      this.loggedIn.set(true);
      this.userRole.set('user');
    }
  }

  logout(): void {
    this.loggedIn.set(false);
    this.userRole.set(null);
  }
}
