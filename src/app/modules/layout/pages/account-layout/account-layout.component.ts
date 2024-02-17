import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OverlayService } from '@services/overlay.service';
import { FloatingButtonComponent } from '@shared/components/atoms/floating-button/floating-button.component';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { FloatingMenuComponent } from '@shared/components/floating-menu/floating-menu.component';
import { TotalBalanceComponent } from '../../../accounts/components/total-balance/total-balance.component';


@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FloatingButtonComponent,
    OverlayModule,
    HeaderbarComponent,
    FloatingMenuComponent,
    TotalBalanceComponent
  ],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.scss'
})
export class AccountLayoutComponent {

  @Input() showTransactionFilter: boolean = true;
  @Input() showDateFilter: boolean = true;

  faPlus = faPlus;
  isOpenOverlayFloatingMenu$!: boolean;

  constructor(
    private overlayService: OverlayService,
  ) {}

  ngOnInit() {
    this.overlayService.isOpenOverlayFloatingMenu$.subscribe(value => {
      this.isOpenOverlayFloatingMenu$ = value;
    });
  }

  changeStateOverlayFloatingMenu() {
    this.overlayService.changeStateOverlayFloatingMenu();
  }
  
}
