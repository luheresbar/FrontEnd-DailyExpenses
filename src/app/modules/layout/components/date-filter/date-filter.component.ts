import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateFilterService } from '@services/date-filter.service';
import { TransactionService } from '@services/transaction.service';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  currentDate: string = "";
  currentDate$: string = "";
  nextDate$: string = "";

  constructor(
    private dateFilterService: DateFilterService,
    private transactionService: TransactionService,

    ) {
  }

  ngOnInit() {
    this.dateFilterService. currentDateFormatted$.subscribe(date => {
      this.currentDate = new DatePipe('en-US').transform(
        date,
        'yyyy-MM')!;
    })

    this.dateFilterService. currentDateFormatted$.subscribe(date => {
      this.currentDate$ = date;
    })
    this.dateFilterService.nextDateFormatted$.subscribe(date => {
      this.nextDate$ = date;
    })

  }
  
  advanceMonth() {
    this.dateFilterService.advanceMonth();
    this.transactionService.getAll(this.currentDate$, this.nextDate$).subscribe();

  }
  
  previousMonth() {
    this.dateFilterService.previousMonth();
    this.transactionService.getAll(this.currentDate$, this.nextDate$).subscribe();
  }
}
