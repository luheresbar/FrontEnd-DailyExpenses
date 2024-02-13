import { Component } from '@angular/core';

import {DialogModule, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-new-register',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog-new-register.component.html',
  styleUrl: './dialog-new-register.component.scss'
})
export class DialogNewRegisterComponent {

  constructor(
    private dialogRef: DialogRef
    ) {}

    close() {
      this.dialogRef.close();
    }
}
