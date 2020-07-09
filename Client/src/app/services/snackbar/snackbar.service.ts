import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000
      // horizontalPosition: "left"
    });
  }

}
