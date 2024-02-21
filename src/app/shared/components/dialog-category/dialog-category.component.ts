import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {CdkMenuModule} from '@angular/cdk/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Category } from '@models/category.model';
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
    CategoryFormComponent
  ],
  templateUrl: './dialog-category.component.html',
  styleUrl: './dialog-category.component.scss'
})
export class DialogCategoryComponent {
  faArrowLeft = faArrowLeft;
  faEllipsisVertical = faEllipsisVertical;
  categoryDetail!: Category;
  showIconfaEllipsisVertical: boolean = true;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: Category,
    private overlayService: OverlayService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
  ) {
    this.categoryDetail = data;
  }

  ngOnInit() {
    if (Object.keys(this.categoryDetail).length === 0) {
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
    // if (
    //   this.categoryDetail !== null &&
    //   this.categoryDetail.accountName !== null
    // ) {
    //   const accountPK: AccountPK = {
    //     userId: this.categoryDetail.userId,
    //     accountName: this.categoryDetail.accountName,
    //   };
    //   this.expenseCategoryService.deleteAccount(accountPK).subscribe();
    // }
  }

}
