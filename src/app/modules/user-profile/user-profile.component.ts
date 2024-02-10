import { Component } from '@angular/core';
import { AvatarComponent } from '@shared/components/atoms/avatar/avatar.component';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [BtnComponent, AvatarComponent, HorizontalLineComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

}
