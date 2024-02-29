import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Category,
  CategoryDto,
  UpdateCategoryDto,
} from '@models/category.model';
import { RequestStatus } from '@models/request-status.model';
import { stateProcess } from '@models/stateProcess.model';
import { AccountService } from '@services/account.service';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { IncomeCategoryService } from '@services/income-category.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  @Input() categoryDetail!: CategoryDto;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  stateProcess: stateProcess = 'create';
  statusRegister: RequestStatus = 'init';

  form = this.formBuilder.nonNullable.group({
    categoryName: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService
  ) {}

  ngOnInit() {
    if (!this.categoryDetail.userId) {
      this.stateProcess = 'create';
    } else {
      this.fillForm();
      this.disableForm();
    }
  }

  createOrUpdateCategory() {
    if (this.form.valid) {
      this.statusRegister = 'loading';
      const { categoryName } = this.form.getRawValue();
      let category!: Category | UpdateCategoryDto;

      if (this.stateProcess === 'create') {
        category = {
          userId: this.categoryDetail.userId,
          categoryName: categoryName,
          available: this.categoryDetail.available
        };
      } else {
        category = {
          userId: this.categoryDetail.userId,
          categoryName: this.categoryDetail.categoryName,
          newCategoryName: categoryName,
          available: this.categoryDetail.available
        };
      }

      const categoryService =
        this.categoryDetail.categoryType === 'expense'
          ? this.expenseCategoryService
          : this.incomeCategoryService;

      const serviceMethod =
        this.stateProcess === 'create' ? 'createCategory' : 'updateCategory';

      categoryService[serviceMethod](category).subscribe({
        next: () => {
          this.statusRegister = 'success';
          this.closeFormDialog();
        },
        error: (error) => {
          this.statusRegister = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillForm() {
    this.form.patchValue({
      categoryName: this.categoryDetail.categoryName,
    });
  }

  enableForm() {
    this.form.get('categoryName')?.enable();
    this.stateProcess = 'edit';
  }

  disableForm() {
    this.form.get('categoryName')?.disable();
    this.stateProcess = 'view';
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
