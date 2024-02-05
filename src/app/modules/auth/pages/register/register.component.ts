import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SocialMediaComponent } from '../../components/social-media/social-media.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, BackgroundComponent, HeaderComponent, SocialMediaComponent, FooterComponent, AuthContainerComponent, LoginFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
