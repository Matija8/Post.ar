import { FormGroup, AbstractControl } from "@angular/forms";

export function correctName(control: AbstractControl){
    const nameReg = /^[a-zA-Z][a-zA-Z']*$/;
    if(!nameReg.test(control.value)){
      return { incorrectFormat : true };
    }
    return null;
};

export function matchingPassword(password: string, retypePassword: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matchControl = formGroup.controls[retypePassword];

    if(matchControl.errors && !matchControl.errors.mustMatch) {
      return;
    }

    if(control.value !== matchControl.value) {
      matchControl.setErrors({ mustMatch: true });
    }
    else {
      matchControl.setErrors(null);
    }
  };
}
