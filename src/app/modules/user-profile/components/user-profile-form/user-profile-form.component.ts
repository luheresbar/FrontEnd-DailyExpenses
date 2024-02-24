import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import {
  RegisterUserDTO,
  UpdateUserDto,
  UserProfile,
} from '@models/user.model';
import { AccountService } from '@services/account.service';
import { UserService } from '@services/user.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';
import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-user-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
    FontAwesomeModule,
  ],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss',
})
export class UserProfileFormComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Input() userDetail!: UpdateUserDto;
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  emailChanged: boolean = false;
  showPassword = false;

  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [''],
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.fillForm();

    this.form.get('email')?.valueChanges.subscribe((newValue) => {
      const originalEmail = this.userDetail.email;
      if (newValue !== originalEmail) {
        this.emailChanged = true;
      } else {
        this.emailChanged = false;
      }
    });
  }

  updateUserProfile() {
    //TODO (es necesario que segun los errores que se envien del backend, se mueste un mensaje apropiado al usuario, ejm si el correo ya existe, entonces indicarlo)
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      
      const updateDto: UpdateUserDto = {
        userId: this.userDetail.userId,
        username: name,
        email: email,
        password: password,
      };
      console.log(updateDto);
      
      this.userService.update(updateDto).subscribe({
        next: () => {
          this.status = 'success';
          this.closeFormDialog();
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

  fillForm() {
    const { username, email } = this.userDetail;

    this.form.controls.name.setValue(username);
    this.form.controls.email.setValue(email);
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }
}
