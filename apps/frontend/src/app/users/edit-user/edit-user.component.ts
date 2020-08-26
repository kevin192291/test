import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '@quicken-interview/api-interfaces';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'quicken-interview-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public allUsers: User[] = [];
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  selectedUser(user) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
      width: '50%',
      height: "500px"
    });
    dialogRef.afterClosed().subscribe(closed => this.load());
  }

  load() {
    this.userService.GetAll('').then(res => this.allUsers = res);
  }
}
