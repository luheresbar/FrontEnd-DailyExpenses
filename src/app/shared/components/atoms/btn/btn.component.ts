import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
  styleUrl: '../../../../../styles/atoms/_button.scss'
})
export class BtnComponent {

  @Input() class: 'btn-basic' | 'btn-primary' | 'btn-secondary' | 'btn-danger' = 'btn-basic';

}
