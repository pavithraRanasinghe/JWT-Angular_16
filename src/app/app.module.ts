import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./common/components/login/login.component";
import {LibModule} from "./lib.module";
import {MaterialModule} from "./material.module";
import {HomeComponent} from "./common/components/home/home.component";
import {AppRoutingModule} from "./app.routing";
import {UserService} from "./common/services/user.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor, JwtInterceptor} from "./common/helpers";

export function initializeApp(userService: UserService): any {
  return (): Promise<void> => userService.loadUserData();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    LibModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
