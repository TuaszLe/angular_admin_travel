import { Routes } from '@angular/router';

import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Auth
  { path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },

  // Pages
  { path: 'admin/locations', loadComponent: () => import('./pages/locations/locations.component').then(m => m.LocationsComponent) },
  { path: 'admin/categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'admin/logs', loadComponent: () => import('./pages/logs/logs.component').then(m => m.LogsComponent) },

  { path: 'admin/locations/add', loadComponent: () => import('./pages/locations/locations-add/locations-add.component').then(m => m.LocationsAddComponent) },
  { path: 'admin/locations/edit/:id', loadComponent: () => import('./pages/locations/locations-edit/locations-edit.component').then(m => m.LocationsEditComponent) },
  { path: 'admin/categories/add', loadComponent: () => import('./pages/categories/categories-add/categories-add.component').then(m => m.CategoriesAddComponent) },
  { path: 'admin/categories/edit/:id', loadComponent: () => import('./pages/categories/categories-edit/categories-edit.component').then(m => m.CategoriesEditComponent) },
  // Logout
  //   { path: 'logout', loadComponent: () => import('./shared/logout/logout.component').then(m => m.LogoutComponent) },




  // Wildcard route (404)
  { path: '**', redirectTo: 'auth/login' }
];
