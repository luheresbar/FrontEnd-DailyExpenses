import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './headerbar.component.html',
  styleUrl: './headerbar.component.scss'
})
export class HeaderbarComponent {

  userProfileActive: boolean = false;


}
