import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import {LoginComponent} from "./login/login.component";
import {ServicesComponent} from "./services/services.component";
import {NotificationsComponent} from "./notifications/notifications.component";

import { AuthGuard } from '../services/authguard/auth-guard.service';
import {HelpComponent} from "./help/help.component";



export const UIRoute: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'magic-link-callback', redirectTo: 'home', pathMatch: 'prefix'},
  { path: 'profile', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'data/:id', component: ServicesComponent, canActivate: [AuthGuard],  pathMatch: 'full'},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '404', component: ErrorComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' },
];
