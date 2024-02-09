import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '@utils/validators';
import { FormValidationMessageComponent } from '../../../../shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule, ReactiveFormsModule, FormValidationMessageComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
    //TODO (Configurar el requerimiento de letra mayuscula y minuscula y al menos un caracter especial, junto a una liste de indicaicones de lo que debe tener la contraseña)
  );

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showRegister = false;
  showPassword = false;
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email).subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          } else {
            this.router.navigate(['/auth/login'], {
              //TODO (Configurar un aviso que indique al usuario que el correo ingresado ya tiene una cuenta registrada)
              queryParams: { email },
            });
          }
        },
        error: (error) => {
          this.statusUser = 'failed';
          console.log(error);
        },
      });
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
