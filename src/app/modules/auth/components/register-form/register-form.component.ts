import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '@utils/validators';
import { FormValidationMessageComponent } from '../../../../shared/components/atoms/form-validation-message/form-validation-message.component';
import { RegisterUserDTO } from '@models/user.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showRegister = false;
  showPassword = false;
  // showConfirmPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/u),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      // confirmPassword: ['', [Validators.required]],
      termsAndConditions: [false, Validators.requiredTrue],
    },
    {
      validators: [
        // CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
    //TODO (Configurar el requerimiento de letra mayuscula y minuscula y al menos un caracter especial, junto a una liste de indicaicones de lo que debe tener la contraseña)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  doRegister() {
    //TODO (es necesario que segun los errores que se envien del backend, se mueste un mensaje apropiado al usuario, ejm si el correo ya existe, entonces indicarlo)
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      const lowercaseEmail = email.toLowerCase();
      const dto: RegisterUserDTO = {
        username: name,
        email: lowercaseEmail,
        password: password,
      };
      this.authService.registerAndLogin(dto).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['']);
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      const lowercaseEmail = email.toLowerCase();
      this.authService.isAvailable(lowercaseEmail).subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(lowercaseEmail);
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
