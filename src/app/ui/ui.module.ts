import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule} from "../app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";

// Components
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';

// Routing
import { UIRoute } from "./ui.routes";
import { ServicesComponent } from './services/services.component';

// Module
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent,
    TopNavComponent,
    AccountComponent,
    LoginComponent,
    NotificationsComponent,
    HelpComponent,
    ServicesComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(UIRoute),
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
    ],
  exports: [
    TopNavComponent,
    LoginComponent,
  ],
  providers:[],
})
export class UiModule { }
