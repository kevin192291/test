import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { CalculateComponent } from './calculate/calculate.component';

import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetailComponent } from './detail/detail.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CalculateComponent, DetailComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PaymentsRoutingModule
  ],
  entryComponents: [DetailComponent]
})
export class PaymentsModule { }
