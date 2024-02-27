import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateFilterService } from '@services/date-filter.service';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  currentDate: string | null = null;
  nextDate: string | null = null;

  constructor(
    private dateFilterService: DateFilterService,

    ) {
  }

  ngOnInit() {
    this.dateFilterService.currentDate$.subscribe(date => {
      this.currentDate = date;
    })
    this.dateFilterService.nextDate$.subscribe(date => {
      this.nextDate = date;
    })
  }
  
  advanceMonth() {
    this.dateFilterService.advanceMonth();
  }
  
  previousMonth() {
    this.dateFilterService.previousMonth();
  }
}
