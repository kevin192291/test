import { Component, OnInit } from '@angular/core';
import { PaymentService } from './services/payment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'quicken-interview-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  public loading: boolean = true;
  displayedColumns: string[] = ['MoneyOwerName', 'owedAmount', 'toUserName'];
  dataSource;

  constructor(public paymentService: PaymentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.paymentService.Calculate();
    this.paymentService.paymentBehaviorSubject.subscribe(payment => this.dataSource = payment);
  }

  rowSelected(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: row,
      width: '50%'
    });
  }

}
