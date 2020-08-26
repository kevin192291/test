import { Injectable } from '@angular/core';
import { UserOwes } from '@quicken-interview/api-interfaces';
import { DataService } from '../../../shared/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends DataService<UserOwes> {
  public paymentBehaviorSubject: BehaviorSubject<
    UserOwes[]
  > = new BehaviorSubject<UserOwes[]>(null);
  constructor(private http: HttpClient, private snack: MatSnackBar) {
    super(environment.payments, http); //In reality, the api endpoint would come from the environment file
  }
  public Calculate() {
    this.GetAll('')
      .then((result) => this.paymentBehaviorSubject.next(result))
      .catch((e) => this.snack.open(`Problem Contacting API`, 'OK', {duration: 3500}));
  }
}
