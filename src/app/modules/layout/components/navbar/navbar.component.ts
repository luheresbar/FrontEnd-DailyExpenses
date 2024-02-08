import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, AvatarComponent, SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  activeButton: string = '';
  tamañoDePantalla!: number;

  constructor() {
    if (typeof window !== 'undefined') {
      this.tamañoDePantalla = window.innerWidth;
    }
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (typeof window !== 'undefined') {
      this.tamañoDePantalla = (event.target as Window).innerWidth;
    }
  }

}