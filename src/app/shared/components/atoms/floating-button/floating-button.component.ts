import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {

  faPlus = faPlus;
}
