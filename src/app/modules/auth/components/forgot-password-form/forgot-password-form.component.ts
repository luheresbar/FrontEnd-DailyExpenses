import { Component } from '@angular/core';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    ReactiveFormsModule,
    FormValidationMessageComponent,
  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
})
export class ForgotPasswordFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;
  unregisteresUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}


  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();

      // Verificar si el correo electrónico está disponible
      this.authService.isAvailable(email).subscribe({
        next: (response) => {
          if (!response.isAvailable) {
            // El correo electrónico está disponible, intentar iniciar sesión
            this.authService.recovery(email).subscribe({
              next: () => {
                this.status = 'success';
                this.emailSent = true;
                this.unregisteresUser = false;
              },
              error: () => {
                this.status = 'failed';
              },
            });
          } else {
            // El correo electrónico no está registrado
            this.status = 'failed';
            this.unregisteresUser = true;
            console.log('El correo electrónico no está registrado');
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
