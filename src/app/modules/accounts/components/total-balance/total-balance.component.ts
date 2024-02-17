import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { ShowAmountService } from '@services/show-amount.service';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';


@Component({
  selector: 'app-total-balance',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HorizontalLineComponent
  ],
  templateUrl: './total-balance.component.html',
  styleUrl: './total-balance.component.scss'
})
export class TotalBalanceComponent {

  showAmount$: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  
  constructor(
    private showAmountServise: ShowAmountService,
  ) {}

  ngOnInit() {
    this.showAmountServise.isAmountVisible$.subscribe(value => {
      this.showAmount$ = value;
    })
  }

  changeVisibilityStatus() {
    this.showAmountServise.changeVisibilityStatus();
  }

}
