import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryLayoutComponent } from '../../../layout/pages/category-layout/category-layout.component';
import { CategoryDetailComponent } from '../../components/category-detail/category-detail.component';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { CategoryDto } from '@models/category.model';

@Component({
  selector: 'app-expense-category-summary',
  standalone: true,
  imports: [
    CommonModule, 
    CategoryLayoutComponent, 
    CategoryDetailComponent
  ],
  templateUrl: './expense-category-summary.component.html',
  styleUrl: './expense-category-summary.component.scss',
})
export class ExpenseCategorySummaryComponent {

  enabledExpenseCategories$: CategoryDto[] = [];
  disabledExpenseCategories$: CategoryDto[] = [];

  constructor(
    private expenseCategoryService: ExpenseCategoryService
  )
  {}

  ngOnInit() {
    this.expenseCategoryService.enabledCategories$.subscribe(categories => {
      this.enabledExpenseCategories$ = categories;
    });
    this.expenseCategoryService.disabledCategories$.subscribe(categories => {
      this.disabledExpenseCategories$ = categories;
    });
    
  }
}
