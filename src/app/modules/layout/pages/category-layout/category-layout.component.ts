import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OverlayService } from '@services/overlay.service';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { FloatingButtonComponent } from '@shared/components/atoms/floating-button/floating-button.component';
import { CategoryTypeFilterComponent } from '../../../categories/components/category-type-filter/category-type-filter.component';


@Component({
  selector: 'app-category-layout',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HeaderbarComponent,
    FloatingButtonComponent,
    OverlayModule,
    CategoryTypeFilterComponent
  ],
  templateUrl: './category-layout.component.html',
  styleUrl: './category-layout.component.scss'
})
export class CategoryLayoutComponent {

  @Input() showTransactionFilter: boolean = true;
  @Input() showDateFilter: boolean = true;
  typeFloatingMenu: string = 'categories';


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
