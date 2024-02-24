import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomValidators } from '@utils/validators';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { RegisterUserDTO, UpdatePasswordDto } from '@models/user.model';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BtnComponent,
    FormValidationMessageComponent,


  ],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();


  form = this.formBuilder.nonNullable.group(
    {
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmNewPassword'),
        CustomValidators.MismatchValidator('password', 'newPassword')
      ],
    }
    //TODO (Configurar el requerimiento de letra mayuscula y minuscula y al menos un caracter especial, junto a una liste de indicaicones de lo que debe tener la contraseña)
  );

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showRegister = false;
  showPassword = false;
  showNewPassword = false;
  showConfirmNewPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  updatePassword() {
    if (this.form.valid) {
      const { password, newPassword, confirmNewPassword } = this.form.getRawValue();
      const dto: UpdatePasswordDto = {
        currentPassword: password,
        newPassword: newPassword,
      };
      console.log(dto); //TODO (Eliminar)
      
      this.userService.updatePassword(dto).subscribe({
        next: () => {
          this.status = 'success';
          this.authService.logout();
          this.closeFormDialog();
          this.router.navigate(['/auth/login'])
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

  closeFormDialog() {
    this.closeDialog.emit();
  }

}
