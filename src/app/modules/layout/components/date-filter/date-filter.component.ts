import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DateFilterService } from '@services/date-filter.service';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  currentDate: string = '';

  constructor(private dateFilterService: DateFilterService) {}

  ngOnInit() {
    this.dateFilterService.currentDateFormatted$.subscribe((date) => {
      this.currentDate = new DatePipe('en-US').transform(date, 'yyyy-MM')!;
    });
  }
  
  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.dateFilterService.setCurrentDate(value);
  }

  advanceMonth() {
    this.dateFilterService.advanceMonth();
  }

  previousMonth() {
    this.dateFilterService.previousMonth();
  }
}
