import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '@models/category.model';
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
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  @Input() categoryDetail!: Category;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  statusRegister: RequestStatus = 'init';
  stateProcess: stateProcess = 'create';

  form = this.formBuilder.nonNullable.group({
    categoryName: ['', [Validators.required]],
  });

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
  ) {}

  ngOnInit() {
    if (Object.keys(this.categoryDetail).length === 0) {
      this.stateProcess = 'create';
    } else {
      
      this.fillForm();
      this.disableForm();
    }
  }

  createNewRegiste() {
      if (this.form.valid) {
        this.statusRegister = 'loading';
        const { categoryName } = this.form.getRawValue();

        const category: Category = {
          userId: this.categoryDetail.userId,
          categoryName: categoryName,
        };
        if (Object.keys(this.categoryDetail).length === 0) {
          
          // this.expenseCategoryService.createAccount(category).subscribe({
          //   next: () => {
          //     this.statusRegister = 'success';
          //     this.closeFormDialog();
          //   },
          //   error: (error) => {
          //     this.statusRegister = 'failed';
          //     console.log(error);
          //   },
          // });
        } else if (Object.keys(this.categoryDetail).length !== 0) {
          // const accountDto: UpdateAccountDto = {
          //   userId: this.categoryDetail.userId,
          //   accountName: this.categoryDetail.accountName,
          //   newAccountName: accountName,
          //   availableMoney: expenseValue,
          //   available: this.categoryDetail.available
          // };
          // console.log(accountDto); //TODO (Eliminar linea)
          //   this.expenseCategoryService.updateAccount(accountDto).subscribe({
          //     next: () => {
          //       this.statusRegister = 'success';
          //       this.closeFormDialog();
          //     },
          //     error: (error) => {
          //       this.statusRegister = 'failed';
          //       console.log(error);
          //     },
          //   });
          }
      
      } else {
        this.form.markAllAsTouched();
      }
  }

  fillForm() {
    this.form.controls.categoryName.setValue(this.categoryDetail.categoryName);
  }

  enableForm() {
    this.form.controls.categoryName.enable();

    this.stateProcess = 'edit';
  }

  disableForm() {
    this.form.controls.categoryName.disable();

    this.stateProcess = 'view';
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}


