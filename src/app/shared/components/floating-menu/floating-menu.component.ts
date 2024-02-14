import { Component, Output } from '@angular/core';
import {DialogModule, Dialog} from '@angular/cdk/dialog';

import { BtnComponent } from '../atoms/btn/btn.component';
import { DialogNewRegisterComponent } from '../dialog-new-register/dialog-new-register.component';
import { EventEmitter } from 'stream';
import { OverlayService } from '@services/overlay.service';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [BtnComponent, DialogModule, DialogNewRegisterComponent],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.scss'
})
export class FloatingMenuComponent {

  constructor(
    private dialog: Dialog,
    private overlayService: OverlayService,
  ) {}

  openDialog() {
    this.dialog.open(DialogNewRegisterComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {},
    });
  }



}


