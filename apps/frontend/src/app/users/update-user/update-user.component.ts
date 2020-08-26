import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailComponent } from '../../payments/detail/detail.component';
import { User } from '@quicken-interview/api-interfaces';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'quicken-interview-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  updateUserFormGroup: FormGroup;
  currentTotal: number;
  newValue: number = 0;
  expenses = new FormArray([]);
  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit(): void {
    this.currentTotal = this.user.currentTotal;
    this.updateUserFormGroup = this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      expense: this.expenses,
      isActive: [this.user.isActive, [Validators.required]],
      currentTotal: this.currentTotal,
    });
    this.user.expense.forEach((expense) =>
      this.expenses.push(new FormControl(expense, [Validators.min(0.01)]))
    );
  }

  updateNewVal($event) {
    this.newValue =  $event.currentTarget.valueAsNumber;
  }

  addExpense() {
    this.expenses.push(new FormControl(this.newValue));
    this.snack.open('Expense Added!', 'ok', { duration: 3000 });
  }

  onSubmit() {
    if (this.updateUserFormGroup.valid) {
      this.userService
        .Update('', '', this.updateUserFormGroup.value)
        .then((res) => {
          this.snack.open('Save Success!', 'ok', { duration: 3000 });
          this.dialogRef.close();
        })
        .catch((e) => {
          debugger;
          this.snack.open('Save Failed', 'ok', { duration: 3000 });
        });
    }
  }
}
