import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryLayoutComponent } from '../../../layout/pages/category-layout/category-layout.component';
import { IncomeCategoryService } from '@services/income-category.service';
import { Category } from '@models/category.model';
import { CategoryDetailComponent } from '../../components/category-detail/category-detail.component';

@Component({
  selector: 'app-income-category-summary',
  standalone: true,
  imports: [
    CommonModule,
    CategoryLayoutComponent,
    CategoryDetailComponent
  ],
  templateUrl: './income-category-summary.component.html',
  styleUrl: './income-category-summary.component.scss'
})
export class IncomeCategorySummaryComponent {

  expenseCategories$: Category[] | null = null;

  constructor(
    private incomeCategoryService: IncomeCategoryService,
  )
  {}

  ngOnInit() {
    this.incomeCategoryService.categories$.subscribe((categories) => {
      this.expenseCategories$ = categories;
    });
  }

}
