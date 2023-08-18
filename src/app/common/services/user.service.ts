import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loadUserData(): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.currentUser = this._currentUserSubject.asObservable();
      resolve();
    });
  }

  public get currentUserValue(): User {
    return this._currentUserSubject!.value;
  }

  public get currentUserSubject(): BehaviorSubject<User> {
    return this._currentUserSubject;
  }

}
