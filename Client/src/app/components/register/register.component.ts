import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { take } from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { correctName, matchingPassword } from './registerValidator.validator';

@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Form data:
  // public name = '';
  // public surname = '';
  // public email = '';
  // public password = '';
  // public retypePassword = '';
  public submitted = false;

  public warning: 'hidden'|'visible';
  private requestPending: boolean;
  public registerForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
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
    if(!this.submitted){
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
        alert('You have successfuly registered!\nYou will now be redirected to the login page');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.requestPending = false;
        console.log('Error from registerUser:', err);
        this.warning = 'visible';
      }
    );
  }

  // validParams(): boolean {
  //   const nameReg = /^[a-zA-Z][a-zA-Z']*$/;
  //   const validName = nameReg.test(this.name.trim()) && nameReg.test(this.surname.trim());
  //
  //   const validPasswdLen = (this.password.length >= 8) && (this.password.length <= 64);
  //   const validPasswd = validPasswdLen && (this.password === this.retypePassword);
  //   const validEmail = /^([a-zA-Z][a-zA-Z_0-9]*$)/.test(this.email.trim());
  //
  //   return validName && validPasswd && validEmail;
  // }

}
