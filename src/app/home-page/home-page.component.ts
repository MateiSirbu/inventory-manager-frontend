import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Authenticator } from '../app-logic/authenticator.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authenticator: Authenticator, private snackBar: MatSnackBar, private router: Router) { }

  firstName: string;
  lastName: string;
  email: string;

  ngOnInit(): void {
    this.authenticator.getAuthenticatedUserInfo()
      .subscribe((res) => {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.email = res.email;
      }, (err) => { })
  }

  logOut() {
    this.authenticator.logOut();
    this.openSnackBar(`You have been logged out.`);
  }

  navigateToLogIn() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/register']);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

}
