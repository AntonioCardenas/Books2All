import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authguard/auth-guard.service';
import { AccountComponent } from './ui/account/account.component';
import { GetBookComponent } from './ui/get-book/get-book.component';
import { HomeComponent } from './ui/home/home.component';
import { LendBooksComponent } from './ui/lend-books/lend-books.component';
import { LoginComponent } from './ui/login/login.component';
import { MyBooksComponent } from './ui/my-books/my-books.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'magic-link-callback', redirectTo: 'home', pathMatch: 'prefix'},
  { path: 'profile', loadComponent:() => import('./ui/account/account.component').then((c) => AccountComponent), canActivate: [AuthGuard]},
  { path: 'home', loadComponent:() => import('./ui/home/home.component').then((c) => HomeComponent), canActivate: [AuthGuard]},
  { path: 'my-books', loadComponent:() => import('./ui/my-books/my-books.component').then((c) => MyBooksComponent)},
  { path: 'lend-book', loadComponent:() => import('./ui/lend-books/lend-books.component').then((c) => LendBooksComponent)},
  { path: 'get-books', loadComponent:() => import('./ui/get-book/get-book.component').then((c) => GetBookComponent)},
  { path: 'login', loadComponent:() => import('./ui/login/login.component').then((c) => LoginComponent)},
  { path: 'home',loadComponent:() => import('./ui/home/home.component').then((c) => AccountComponent), canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
