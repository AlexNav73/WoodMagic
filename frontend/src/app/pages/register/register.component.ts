import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, Subscription, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { matchPasswords } from '../../model/validators';

type ErrorType = {
  [key: string]: string[];
}

interface RegisterResult {
  name: 'result';
  type: string;
  title: string;
  status: number;
  errors: ErrorType; 
}

function isNetworkError(error: RegisterResult | TypeError): error is TypeError {
  return error.name === 'TypeError';
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);

  private subscription!: Subscription;

  form = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required]),
    confirmPassword: this.fb.control<string>('', [Validators.required]),
  }, {
    validators: [matchPasswords]
  });
  errorMessages: WritableSignal<string[]> = signal([]);

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
    this.subscription = this.http.post<RegisterResult | number>(environment.apiUrl + '/register', {
      email: this.email.value,
      password: this.form.controls.password.value
    })
    .pipe(catchError((e: HttpErrorResponse) => {
      this.onError(e.error);
      return throwError(() => 'Test');
    }))
    .subscribe(res => { console.log(res); });
  }

  onError(res: RegisterResult | TypeError) {
    if (isNetworkError(res)) {
      this.errorMessages.set(['Network error']);
    } else {
      let errors = Array.from(Object.values(res.errors))
        .reduce((accumulator: string[], value) => accumulator.concat(value), []);
      this.errorMessages.set(errors);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

