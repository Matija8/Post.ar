import { AbstractControl } from '@angular/forms';
import { validEmailRegex } from 'src/app/models/User';

export function correctEmail(control: AbstractControl) {
  const emailReg = validEmailRegex;
  if (!emailReg.test(control.value)) {
    return { incorrectEmail: true };
  }
  return null;
}
