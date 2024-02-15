import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  isOpenOverlayFloatingMenu$ = new BehaviorSubject<boolean>(false);

  changeStateOverlayFloatingMenu() { 
    this.isOpenOverlayFloatingMenu$.next(!this.isOpenOverlayFloatingMenu$.value);
  }
 
}
