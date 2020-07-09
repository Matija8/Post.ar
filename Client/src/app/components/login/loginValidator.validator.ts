import { AbstractControl } from '@angular/forms';
import { validUsernameOrEmailRegex } from 'src/app/models/User';

export function correctEmailOrUsername(control: AbstractControl) {
  if (!validUsernameOrEmailRegex.test(control.value)) {
    return { incorrectEmail: true };
  }
  return null;
}
