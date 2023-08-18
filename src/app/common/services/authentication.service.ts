import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpMethod} from '../models/http-method';
import {HttpService} from './http.service';
import {ReplaySubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../models/user";
import {UserService} from "./user.service";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private user!: User;

  constructor(
    protected httpService: HttpService,
    private userService: UserService,
    private router: Router) {
  }

  basicLogin(request: { username: string, password: string }) {
    return this.httpService.sendHttp<any>("http://localhost:3000/user", HttpMethod.GET, null);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userService.currentUserSubject.next(null as any);
    this.router.navigate(['/login']);
  }

  async setUser(user: User): Promise<void> {
    this.user = user;
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
    await this.userService.loadUserData();
  }

  getUser(): User {
    if (!this.user) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.user = JSON.parse(userJson);
      }
    }
    return this.user;
  }
}
