import { Injectable } from '@nestjs/common';
import { User } from '@quicken-interview/api-interfaces';
const uuidv4 = require("uuid/v4")

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            "id": "9deb27c4-3564-4575-8c8c-57733c4c7757",
            "name": "Adriana",
            "expense": [
              5.75,
              35.00,
              12.79
            ],
            "isActive": true,
            "currentTotal": 53.54
          },
          {
            "id": "cc3dca01-ba29-4a4b-b6a1-35609d2e2a27",
            "name": "Bao",
            "expense": [
              12,
              15,
              23.23
            ],
            "isActive": true,
            "currentTotal": 50.23
          },
          {
            "id": "a9e240cd-8b8d-405c-9186-f27e112520b7",
            "name": "Camden",
            "expense": [
              10,
              20,
              38.41,
              45
            ],
            "isActive": true,
            "currentTotal": 113.41
          }
    ];

    public getAllUsers(): User[] {
        return this.users;
    }

    public getOneUser(id): User {
        const user = this.users.find(user => user.id === id.id);
        return user;
    }

    public createUser(user: User): User {
        // Do validation here!
        user.isActive = true;
        user.id = uuidv4();
        
        // This may be a bit of work now, but it will save us time and processing
        // power later on
        user.currentTotal = user.expense.reduce((a,b) => a+b,0);
        this.users.push(user);
        return user;
    }

    public updateUser(user: User): User {
        const userId = user.id;
        const dbUserIndex = this.users.findIndex(u => u.id === user.id);

        // This isn't pretty, but without a DB it is easy to do, expecially
        // beause it is such a small requirement, if things were larger a DB
        // would be good here and make this easier
        this.users[dbUserIndex].name = user.name;
        this.users[dbUserIndex].isActive = user.isActive; // Reactivate a user???
        this.users[dbUserIndex].expense = user.expense;

        // This may be a bit of work now, but it will save us time and processing
        // power later on
        this.users[dbUserIndex].currentTotal = user.expense.reduce((a,b) => a+b,0);

        return this.users[dbUserIndex];
    }

    public deleteUser(id: string): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return false;
        } else {
            this.users.splice(index, 1);
            return true;
        }
    }
}
