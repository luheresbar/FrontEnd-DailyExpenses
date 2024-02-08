import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, AvatarComponent, SearchInputComponent],
  templateUrl: './headerbar.component.html',
  styleUrl: './headerbar.component.scss'
})
export class HeaderbarComponent {



}
