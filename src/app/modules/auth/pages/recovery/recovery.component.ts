import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { CommonModule } from '@angular/common';
import { RecoveryFormComponent } from '../../components/recovery-form/recovery-form.component';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, RecoveryFormComponent, RouterLinkWithHref],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {

  showSocialMedia: boolean = false;

}
