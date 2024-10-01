import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, Subscription, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

type RegisterResponse = {
  type: string;
  title: string;
  status: number;
  errors: Map<string, string[]>; 
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
    password: this.fb.control<string>(''),
    confirmPassword: this.fb.control<string>('')
  });
  errorMessages: WritableSignal<string[]> = signal([]);

  get email() {
    return this.form.controls.email;
  }

  onSubmit() {
    this.subscription = this.http.post<RegisterResponse|number>(environment.apiUrl + '/register', {
      email: this.email.value,
      password: this.form.controls.password.value
    })
    .pipe(catchError((e: HttpErrorResponse) => {
      this.onError(e.error);
      return throwError(() => e.error);
    }))
    .subscribe(res => { console.log(res); });
  }

  onError(res: RegisterResponse) {
    let errors = Array.from(res.errors.values())
      .reduce((accumulator, value) => accumulator.concat(value), []);
    this.errorMessages.set(errors);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

