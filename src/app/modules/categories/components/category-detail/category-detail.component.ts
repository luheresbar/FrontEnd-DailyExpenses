import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryDto } from '@models/category.model';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';
import { DialogCategoryComponent } from '@shared/components/dialog-category/dialog-category.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  @Input() expenseCategoryDetail!: CategoryDto;

  constructor(private dialog: Dialog) {}

  ngOnInit() {}

  openDialogViewCategory() {
    this.dialog.open(DialogCategoryComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {
        categoryType: this.expenseCategoryDetail.categoryType,
        categoryName: this.expenseCategoryDetail.categoryName,
        userId: this.expenseCategoryDetail.userId,
      },
    });
  }
}
