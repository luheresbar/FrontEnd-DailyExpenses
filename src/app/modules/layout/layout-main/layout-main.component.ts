import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
})
export class LayoutMainComponent {


  constructor(
    private userService: UserService,
  ) {}
  
    ngOnInit() {
      this.userService.getProfile().subscribe(profile => {
        console.log('solicitud layout main');
      });
    }

}
