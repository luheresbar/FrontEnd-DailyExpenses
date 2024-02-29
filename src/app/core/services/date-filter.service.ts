import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateFilterService {
  currentDateFormatted$ = new BehaviorSubject<string>('');
  nextDateFormatted$ = new BehaviorSubject<string>('');

  currentDateChanged$ = new BehaviorSubject<void>(undefined);

  constructor() {
    this.currentDateFormatted$.next(this.getCurrentDate());
    this.nextDateFormatted$.next(this.getNextDate());
  }

  ngOnInit() {}

  private formatDateToDateTime(date: Date | string): string {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }

  private getNextMonthDateTime(): string {
    const currentDateFormatted = this.currentDateFormatted$.value;
    const nextMonthDate = new Date(currentDateFormatted);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    return this.formatDateToDateTime(nextMonthDate);
  }

  private getPreviousMonthDateTime(): string {
    const currentDateFormatted = this.currentDateFormatted$.value;
    const previousMonthDate = new Date(currentDateFormatted);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    return this.formatDateToDateTime(previousMonthDate);
  }

  getCurrentDate(): string {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);

    return this.formatDateToDateTime(today);
  }

  getNextDate(): string {
    return this.getNextMonthDateTime();
  }

  setCurrentDate(date: string) {
    const newCurrentMonthDate = this.formatDateToDateTime(date);
    this.currentDateFormatted$.next(newCurrentMonthDate);
    const newNextMonthDate = this.getNextMonthDateTime();
    this.nextDateFormatted$.next(newNextMonthDate);
    
    this.currentDateChanged$.next();
  }

  advanceMonth() {
    const newCurrentMonthDate = this.getNextMonthDateTime();
    this.currentDateFormatted$.next(newCurrentMonthDate);
    const newNextMonthDate = this.getNextMonthDateTime();
    this.nextDateFormatted$.next(newNextMonthDate);

    this.currentDateChanged$.next();
  }

  previousMonth() {
    const newCurrentMonthDate = this.getPreviousMonthDateTime();
    this.currentDateFormatted$.next(newCurrentMonthDate);
    const newNextMonthDate = this.getNextMonthDateTime();
    this.nextDateFormatted$.next(newNextMonthDate);

    this.currentDateChanged$.next();
  }
}
