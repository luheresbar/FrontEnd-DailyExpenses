import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateFilterService {
  currentDateFormatted$ = new BehaviorSubject<string>("");
  nextDateFormatted$ = new BehaviorSubject<string>("");

  constructor() {
    this.currentDateFormatted$.next(this.getCurrentDate());
    this.nextDateFormatted$.next(this.getNextDate());
  }

  ngOnInit() {}

  getCurrentDate(): string {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);

    return new DatePipe('en-US').transform(today, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }

  getNextDate(): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return new DatePipe('en-US').transform(
      nextMonth,
      'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }

  advanceMonth() {
    const currentDateString = this.currentDateFormatted$.value;
    if (currentDateString != null) {
      const [year, month] = currentDateString.split('-').map(Number);
      const nextMonthDate = new Date(year, month + 0);
      this.currentDateFormatted$.next(
        new DatePipe('en-US').transform(
          nextMonthDate,
          'yyyy-MM-ddTHH:mm:ss.SSS')!
      );
    }
    const nextDateString = this.nextDateFormatted$.value;
    if (nextDateString != null) {
      const [year, month] = nextDateString.split('-').map(Number);
      const nextMonthDate = new Date(year, month + 0);
      this.nextDateFormatted$.next(
        new DatePipe('en-US').transform(
          nextMonthDate,
          'yyyy-MM-ddTHH:mm:ss.SSS')!
      );
    }
  }
  previousMonth() {
    const currentDateString = this.currentDateFormatted$.value;
    if (currentDateString != null) {
      const [year, month] = currentDateString.split('-').map(Number);
      const prevMonthDate = new Date(year, month - 2);
      this.currentDateFormatted$.next(
        new DatePipe('en-US').transform(
          prevMonthDate,
          'yyyy-MM-ddTHH:mm:ss.SSS')!
      );
    }
    const nextDateString = this.nextDateFormatted$.value;
    if (nextDateString != null) {
      const [year, month] = nextDateString.split('-').map(Number);
      const prevMonthDate = new Date(year, month - 2);
      this.nextDateFormatted$.next(
        new DatePipe('en-US').transform(
          prevMonthDate,
          'yyyy-MM-ddTHH:mm:ss.SSS')!
      );
    }
  }
}
