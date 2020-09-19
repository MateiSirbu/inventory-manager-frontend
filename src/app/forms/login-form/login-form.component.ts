import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../app-logic/user'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  authenticated = false;

  model = new User({
    email: "",
    password: ""
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.authenticated = true;
    this.openSnackBar(`Called onSubmit. ${this.model.email}, ${this.model.password}`)
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      panelClass: ['my-snack-bar-alert']
    });
  }

}
