import { Routes } from '@angular/router';
import { PROJECTS_ROUTES } from './projects.routes';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

import { LoginComponent } from './login/login';

export const routes: Routes = [
  // Redirection par défaut vers /dashboard pour voir les stats dès le démarrage
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Routes des projets (inclut le dashboard, projets, tâches, etc.)
  ...PROJECTS_ROUTES,

  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  // Route wildcard pour les pages non trouvées
  { path: '**', redirectTo: 'dashboard' }
];
