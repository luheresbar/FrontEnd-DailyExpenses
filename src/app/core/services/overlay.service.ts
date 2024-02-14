import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  isOpenOverlayFloatingMenu$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleOverlay(value: boolean) {
    this.isOpenOverlayFloatingMenu$.next(value);
  }

}
