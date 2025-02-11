import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryDto } from '@models/category.model';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  @Input() categoryDetail!: CategoryDto;

  constructor(private dialog: Dialog) {}

  ngOnInit() {}

  openDialogViewCategory() {
    this.dialog.open(DialogCategoryComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        categoryType: this.categoryDetail.categoryType,
        categoryName: this.categoryDetail.categoryName,
        userId: this.categoryDetail.userId,
        available: this.categoryDetail.available,
      },
    });
  }

  getCategoryTypeClass(): string {
    if (this.categoryDetail.available) {
        return 'enabled';
      } else {
        return 'disabled';
    }
  }

}


