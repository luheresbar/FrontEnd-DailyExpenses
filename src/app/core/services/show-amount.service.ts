import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowAmountService {

  isAmountVisible$ = new BehaviorSubject<boolean>(false);

  changeVisibilityStatus() { 
    this.isAmountVisible$.next(!this.isAmountVisible$.value);
  }
  doAmountInvisible() { 
    this.isAmountVisible$.next(false);
  }
 
}
