import { Component } from '@angular/core';
import { BackgroundComponent } from '../background/background.component';
import { HeaderComponent } from '../header/header.component';
import { SocialMediaComponent } from '../social-media/social-media.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, BackgroundComponent, HeaderComponent, SocialMediaComponent, FooterComponent],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {

}
