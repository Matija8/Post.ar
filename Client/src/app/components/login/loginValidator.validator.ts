import { FormGroup, AbstractControl } from "@angular/forms";

export function correctEmail(control: AbstractControl){
  const emailReg = /^[a-zA-Z][a-zA-Z_0-9]*?(@post\.ar)?$/;
  if(!emailReg.test(control.value)){
    return { incorrectEmail: true };
  }
  return null;
}
