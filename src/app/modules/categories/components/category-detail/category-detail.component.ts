import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '@models/category.model';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {

  @Input() expenseCategoryDetail!: Category;
  // showAmount$: boolean = false;

  // faEye = faEye;
  // faEyeSlash = faEyeSlash;


  // constructor(
  //   private dialog: Dialog,
  //   private showAmountServise: ShowAmountService,

  //   ) {
  // }

  // ngOnInit() {
  //   this.showAmountServise.isAmountVisible$.subscribe(value => {
  //     this.showAmount$ = value;
  //   })
  // }

  // // changeVisibilityStatus() {
  // //   this.showAmountServise.changeVisibilityStatus();
  // // }

  // getTransactionTypeClass(): string {
  //   if (this.accountDetail.available) {
  //       return 'enabled';
  //     } else {
  //       return 'disabled';
  //   }
  // }

  // openDialogViewTransaction() {
  //   this.dialog.open(DialogAccountComponent, {
  //     minWidth: '300px',
  //     width: '100%',
  //     height: '100vh',
  //     autoFocus: false,
  //     data: {
  //       accountName: this.accountDetail.accountName,
  //       userId: this.accountDetail.userId,
  //       availableMoney: this.accountDetail.availableMoney,
  //       available: this.accountDetail.available,

  //     },
  //   });
  // }

}
