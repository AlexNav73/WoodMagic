import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import { matchPasswords } from '../../validators/validators';
import { AppState } from '../../store/app.states';
import { signUp } from '../../store/actions/auth.actions';

@Component({
  selector: 'sign-up',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './signUp.component.html',
  styleUrl: './signUp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private fb = inject(NonNullableFormBuilder);
  private store: Store<AppState> = inject(Store<AppState>);

  form = this.fb.group(
    {
      email: this.fb.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control<string>('', [Validators.required]),
      confirmPassword: this.fb.control<string>('', [Validators.required]),
    },
    {
      validators: [matchPasswords],
    }
  );

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  onSubmit() {
    this.store.dispatch(
      signUp({ email: this.email.value, password: this.password.value })
    );
  }
}
