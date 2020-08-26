import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOwes, User } from '@quicken-interview/api-interfaces';
import { UserService } from './../../users/services/user.service';

@Component({
  selector: 'quicken-interview-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public ower: User;
  public owed: User;
  constructor(
  public dialogRef: MatDialogRef<DetailComponent>,
  public userService: UserService,
  @Inject(MAT_DIALOG_DATA) public userOwes: UserOwes) {}

  ngOnInit() {
    this.userService.GetSingle(this.userOwes.fromUserId,'').then(o => this.ower = o);
    this.userService.GetSingle(this.userOwes.toUserId,'').then(o => this.owed = o);
  }

}
