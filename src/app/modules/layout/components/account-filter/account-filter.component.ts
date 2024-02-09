import { Component } from '@angular/core';

@Component({
  selector: 'app-account-filter',
  standalone: true,
  imports: [],
  templateUrl: './account-filter.component.html',
  styleUrl: './account-filter.component.scss',
})
export class AccountFilterComponent {

  activeButton: string = 'all';

  setActiveButton(button: string) {
    this.activeButton = button;
  }
}
