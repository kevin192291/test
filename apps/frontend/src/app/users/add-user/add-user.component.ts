import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'quicken-interview-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.addUserFormGroup = this.formBuilder.group({
      id: ['new'],
      name: ['', Validators.required],
      expense: new FormArray([new FormControl(0)]),
      isActive: [true, [Validators.required]],
      currentTotal: [0]
    });
  }

  onSubmit() {
    if (this.addUserFormGroup.valid) {
      this.userService
        .Create('', this.addUserFormGroup.value)
        .then((res) => {
          this.snack.open('Save Success!', 'ok', { duration: 3000 });
          this.router.navigate(['/'])
        })
        .catch((e) =>
          this.snack.open('An error occured', 'ok', { duration: 3000 })
        );
    } else {
      this.snack.open('The form is not valid, please fix the errors and try again', 'ok', { duration: 3000 });
    }
  }
}
