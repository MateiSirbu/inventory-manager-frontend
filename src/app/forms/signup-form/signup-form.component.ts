import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/app-logic/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  model = new User({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  submitted = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.openSnackBar(`Called onSubmit. ${this.model.firstName}, ${this.model.lastName}, ${this.model.email}, ${this.model.password}`)
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
