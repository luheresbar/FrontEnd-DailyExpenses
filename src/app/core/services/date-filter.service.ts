import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateFilterService {

  currentDate$ = new BehaviorSubject<string | null>(null);
  nextDate$ = new BehaviorSubject<string | null>(null);

  constructor(
    ) {

    this.currentDate$.next(this.getCurrentDate());
    this.nextDate$.next(this.getNextDate());

  }

  ngOnInit() {
  }

  getCurrentDate(): string | null {
    return new DatePipe('en-US').transform(new Date(), 'yyyy-MM');
  }
  getNextDate(): string | null {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return new DatePipe('en-US').transform(nextMonth, 'yyyy-MM');
  }
  
  advanceMonth() {
    const currentDateString = this.currentDate$.value;
    if (currentDateString != null) {
      const [year, month] = currentDateString.split('-').map(Number);
      const nextMonthDate = new Date(year, month + 0 );
      this.currentDate$.next(new DatePipe('en-US').transform(nextMonthDate, 'yyyy-MM'));
    }
    const nextDateString = this.nextDate$.value;
    if (nextDateString != null) {
      const [year, month] = nextDateString.split('-').map(Number);
      const nextMonthDate = new Date(year, month + 0 );
      this.nextDate$.next(new DatePipe('en-US').transform(nextMonthDate, 'yyyy-MM'));
    }

  }
  previousMonth() {
    const currentDateString = this.currentDate$.value;
    if (currentDateString != null) {
      const [year, month] = currentDateString.split('-').map(Number);
      const prevMonthDate = new Date(year, month - 2);
      this.currentDate$.next(new DatePipe('en-US').transform(prevMonthDate, 'yyyy-MM')); 
    }
    const nextDateString = this.nextDate$.value;
    if (nextDateString != null) {
      const [year, month] = nextDateString.split('-').map(Number);
      const prevMonthDate = new Date(year, month - 2);
      this.nextDate$.next(new DatePipe('en-US').transform(prevMonthDate, 'yyyy-MM')); 
    }
  }

}
