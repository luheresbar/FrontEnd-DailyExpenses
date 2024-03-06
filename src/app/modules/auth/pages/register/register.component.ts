import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SocialMediaComponent } from '../../components/social-media/social-media.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    BackgroundComponent, 
    HeaderComponent, 
    SocialMediaComponent, 
    FooterComponent, 
    AuthContainerComponent, 
    RegisterFormComponent,
    RouterLinkWithHref
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {

}
