import { Component } from '@angular/core';
import { BtnComponent } from '../atoms/btn/btn.component';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.scss'
})
export class FloatingMenuComponent {

}
