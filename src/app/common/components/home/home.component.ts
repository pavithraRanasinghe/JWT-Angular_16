import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']})
export class HomeComponent {

  constructor(private router: Router) {
  }

  buttonClick(){
    this.router.navigateByUrl('login');
  }
}
