import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./common/components/home/home.component";
import {LoginComponent} from "./common/components/login/login.component";
import {authGuard} from "./common/helpers/auth.guard";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    data: {title: 'DASHBOARD'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {register: true, title: 'LOGIN'}
  },

  // otherwise redirect to home.
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
