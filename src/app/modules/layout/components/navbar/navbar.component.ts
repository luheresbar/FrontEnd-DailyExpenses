import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faL } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../../../auth/components/footer/footer.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, AvatarComponent, SearchInputComponent, FontAwesomeModule, FooterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  activeButton: string = 'transactions';
  faBell = faBell;
  showAditionalContent: boolean = true;

  constructor() {}

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.showAditionalContent = (event.target as Window).innerWidth > 768;
  }

}