import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div>
          <h2 class="mt-6 text-center text-3xl font-black text-gray-900">Connexion</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Utilisez admin@test.com pour les droits admin
          </p>
        </div>
        <form class="mt-8 space-y-6" (submit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <input name="email" type="email" [(ngModel)]="email" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                     placeholder="Adresse email">
            </div>
            <div>
              <input name="password" type="password" [(ngModel)]="password" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                     placeholder="Mot de passe">
            </div>
          </div>

          <div>
            <button type="submit" 
                    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSubmit() {
    this.authService.login(this.email, this.password);
    
    // Récupérer l'URL de redirection ou aller au dashboard par défaut
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }
}
