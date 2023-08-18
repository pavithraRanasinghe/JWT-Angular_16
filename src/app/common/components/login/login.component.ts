import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../../services/authentication.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  invalidLogin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    protected formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.populateForm();
    if (localStorage.getItem('user')) {
      this.authenticationService.logout();
    }
  }

  populateForm()
    :
    void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  /**
   * Check login
   */
  checkLogin() {
    this.authenticationService.basicLogin(this.form!.value).pipe(first()).subscribe({
      next: data => {
        this.authenticationService.setUser(data);
        this.router.navigateByUrl('', {replaceUrl: true, state: {isLogin: true}});
        this.invalidLogin = false;
        this.messageService.success('LOGIN_SUCCESSFUL', '');
      },
      error: error => {
        this.invalidLogin = true;
        console.log(error);
        this.messageService.error('LOGIN_FAILED', error);
      }

    });
  }

  /**
   * When press ENTER key trigger login
   *
   * @param event Get pressed key from password field
   */
  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      if (this.form.valid) {
        this.checkLogin();
      } else {
        this.messageService.error('LOGIN_FAILED', 'LOGIN_INCOMPLETE');
      }
    }
  }
}
