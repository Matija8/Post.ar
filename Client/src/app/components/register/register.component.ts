import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { correctName, matchingPassword } from './registerValidator.validator';
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

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, correctName]],
      surname: ['', [Validators.required, correctName]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
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
