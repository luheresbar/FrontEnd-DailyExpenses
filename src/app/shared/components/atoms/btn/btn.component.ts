import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: 'btn-basic' | 'btn-primary' | 'btn-secondary' | 'btn-logout' | 'btn-danger' | 'btn-floating-menu'= 'btn-basic';

  faSpinner = faSpinner;

  onClick(): void {
  }

}
