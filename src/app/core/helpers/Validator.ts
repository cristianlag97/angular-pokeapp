import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

    return password === confirmPassword ? null : { passwordsNotMatch: true };
  };
}
