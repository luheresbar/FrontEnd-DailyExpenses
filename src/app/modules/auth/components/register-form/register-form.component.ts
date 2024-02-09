import { Component } from '@angular/core';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestStatus } from '../../../../core/models/request-status.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showRegister = false;
  showPassword = false;
  statusUser: RequestStatus = 'init';

  constructor (
    private formBuilder: FormBuilder,
  ) {}

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  })



  validateUser() {
    if(this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          } else {
            this.router.navigate(['/login'], {
              //TODO (Configurar un aviso que indique al usuario que el correo ingresado ya tiene una cuenta registrada)
              queryParams: { email }
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
