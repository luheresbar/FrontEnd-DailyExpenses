import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, AvatarComponent, SearchInputComponent, RouterLinkWithHref],
  templateUrl: './headerbar.component.html',
  styleUrl: './headerbar.component.scss'
})
export class HeaderbarComponent {



}
