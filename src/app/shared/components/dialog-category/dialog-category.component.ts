import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryDto } from '@models/category.model';
import { RequestStatus } from '@models/request-status.model';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { IncomeCategoryService } from '@services/income-category.service';
import { OverlayService } from '@services/overlay.service';
import { CategoryFormComponent } from '../../../modules/categories/components/category-form/category-form.component';

@Component({
  selector: 'app-dialog-category',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CdkMenuModule,
    CategoryFormComponent,
  ],
  templateUrl: './dialog-category.component.html',
  styleUrl: './dialog-category.component.scss',
})
export class DialogCategoryComponent {
  faArrowLeft = faArrowLeft;
  faEllipsisVertical = faEllipsisVertical;
  categoryDetail!: CategoryDto;
  showIconfaEllipsisVertical: boolean = true;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: CategoryDto,
    private overlayService: OverlayService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
  ) {
    this.categoryDetail = data;
  }

  ngOnInit() {
    if (this.categoryDetail.userId === null) {
      this.showIconfaEllipsisVertical = false;
    }
  }

  close() {
    this.dialogRef.close();
    this.overlayService.closeOverlayFloatingMenu();
  }

  onCloseDialog() {
    this.close();
  }

  deleteAccount() {
    if (
      this.categoryDetail !== null &&
      this.categoryDetail.categoryName !== null
    ) {
      const categoryPK: Category = {
        userId: this.categoryDetail.userId,
        categoryName: this.categoryDetail.categoryName,
      };
      if (this.categoryDetail.categoryType === 'expense') {
        this.expenseCategoryService
          .deleteExpenseCategory(categoryPK)
          .subscribe();
      } else if (this.categoryDetail.categoryType === 'income') {
        this.incomeCategoryService.deleteIncomeCategory(categoryPK).subscribe();
      }
    }
  }
}
