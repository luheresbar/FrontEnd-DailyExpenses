import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
}
