import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { TransferService } from '@services/transfer.service';

@Component({
  selector: 'app-transfer-summary',
  standalone: true,
  imports: [CommonModule, TransactionLayoutComponent, TransactionDetailComponent],
  templateUrl: './transfer-summary.component.html',
  styleUrl: './transfer-summary.component.scss'
})
export class TransferSummaryComponent {

  transfers: TransactionDetail[] = [];

  constructor(
    private transferService: TransferService,
  ) {}

  ngOnInit() {
    this.transferService.getTransfers().subscribe(transfers => {
      this.transfers = transfers.transactionDetails;
    });
  }
}
