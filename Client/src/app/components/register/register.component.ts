import { Component, OnInit } from '@angular/core';
import { RegisterData, MAX_NAME_LEN, MIN_PASSWD_LEN, MAX_PASSWD_LEN, MAX_USERNAME_LEN } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { correctName, matchingPassword, correctUsername } from './registerValidator.validator';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public submitted = false;

  public warning: 'hidden'|'visible';
  private requestPending: boolean;
  public registerForm: FormGroup;

  // Constants for string interpolation (html).
  public readonly MAX_NAME_LEN = MAX_NAME_LEN;
  public readonly MIN_PASSWD_LEN = MIN_PASSWD_LEN;
  public readonly MAX_PASSWD_LEN = MAX_PASSWD_LEN;
  public readonly MAX_USERNAME_LEN = MAX_USERNAME_LEN;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, correctName, Validators.maxLength(MAX_NAME_LEN)]],
      surname: ['', [Validators.required, correctName, Validators.maxLength(MAX_NAME_LEN)]],
      email: ['', [Validators.required, correctUsername, Validators.maxLength(MAX_USERNAME_LEN)]],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWD_LEN), Validators.maxLength(MAX_PASSWD_LEN)]],
      retypePassword: ['', [Validators.required]]
    },
      {
        validator: matchingPassword('password', 'retypePassword')
      });
  }

  ngOnInit(): void {
    this.warning = 'hidden';
  }

  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    if (this.requestPending) {
      return;
    }
    if (!this.submitted) {
      this.submitted = true;
    }
    if (this.registerForm.invalid) {
      return;
    }
    const registrationData: RegisterData = {
      name: this.f.name.value.trim(),
      surname: this.f.surname.value.trim(),
      email: this.f.email.value.trim(),
      password: this.f.password.value.trim()
    };
    console.log(this.registerForm);
    this.warning = 'hidden';
    this.auth.registerUser(registrationData)
    .subscribe(
      (res: any) => {
        this.requestPending = false;
        this.snackBarService.openSnackBar('Successfuly created an account.');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.requestPending = false;
        console.log('Error from registerUser:', err);
        this.warning = 'visible';
      }
    );
  }
}
