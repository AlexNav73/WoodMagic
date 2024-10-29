import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchPasswords: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { PasswordNoMatch: ["Passwords don't match"] };
};
