import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '@utils/validators';
import { AuthService } from '@services/auth.service';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule, ReactiveFormsModule, FormValidationMessageComponent],
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss'
})
export class RecoveryFormComponent {


  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: string = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showConfirmPassword = false;
  token = '';


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
