import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';

import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showPassword: boolean = false;
  status: RequestStatus = 'init';
  unregisteresUser: boolean = false;
  invalidPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const email = params.get('email');
      if (email) {
        this.form.controls.email.setValue(email);
      }
    });
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();

      // Verificar si el correo electrónico está disponible
      this.authService.isAvailable(email).subscribe({
        next: (response) => {
          if (!response.isAvailable) {
            // El correo electrónico está disponible, intentar iniciar sesión
            this.authService.login(email, password).subscribe({
              next: () => {
                this.status = 'success';
                this.router.navigate(['']);
              },
              error: (loginError) => {
                this.status = 'failed';
                console.log(loginError);
                this.invalidPassword = true;
                this.unregisteresUser = false;
              },
            });
          } else {
            // El correo electrónico no está registrado
            this.status = 'failed';
            console.log('El correo electrónico no está registrado');
            this.invalidPassword = false;
            this.unregisteresUser = true;
          }
        },
        error: (availabilityError) => {
          this.status = 'failed';
          console.log(availabilityError);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
