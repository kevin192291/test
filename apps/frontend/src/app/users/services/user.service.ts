import { Injectable } from '@angular/core';
import { User } from '@quicken-interview/api-interfaces';
import { DataService } from '../../shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'apps/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User> {

  constructor(private http: HttpClient, private snack: MatSnackBar) {
    super(environment.users, http); //In reality, the api endpoint would come from the environment file
  }

  getSingleUser(userId: string) {
    return this.GetSingle('', userId);
  }
}
