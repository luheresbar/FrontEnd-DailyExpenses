import { Component } from '@angular/core';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule],
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss'
})
export class RecoveryFormComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

}
