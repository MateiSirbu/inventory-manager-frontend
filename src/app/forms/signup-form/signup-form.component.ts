import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, tap } from 'rxjs/operators';
import { Authenticator } from 'src/app/app-logic/authenticator.service';
import { User } from 'src/app/app-logic/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    public authenticator: Authenticator,
    private router: Router) { }

  model = new User({
    firstName: "",
    lastName: "",
    email: "",
    hash: ""
  })

  inputEnabled = true;
  submitted = false;
  verifyPassword = "";

  ngOnInit(): void {
  }

  onSubmit() {
    this.openSnackBar('Creating your account...')
    this.inputEnabled = false;
    this.model.email = this.model.email.toLowerCase();
    this.authenticator.signUp(this.model)
      .pipe(tap((resp) => {
        if (resp != null) {
          this.openSnackBar('Account created successfully.')
          this.submitted = true;
          this.inputEnabled = true;
        }
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.openSnackBarAlert(`${error.status}: ${error.statusText}. Cannot register.`);
        this.inputEnabled = true;
        return EMPTY;
      }))
      .subscribe();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
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
