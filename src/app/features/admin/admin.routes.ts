import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { AdminProjectsComponent } from './admin-projects/admin-projects';
import { AdminUsersComponent } from './admin-users/admin-users';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'projects', component: AdminProjectsComponent },
  { path: 'users', component: AdminUsersComponent }
];
