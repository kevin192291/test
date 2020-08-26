import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@quicken-interview/api-interfaces';
import { UserOwes } from '@quicken-interview/api-interfaces';

@Injectable()
export class PaymentsService {
    constructor(private usersService: UsersService) {
    }

    doCalc(): UserOwes[] {
        const result: UserOwes[] = [];
        const users = this.usersService.getAllUsers()
        const averageCost = this.getAverageCost(users);
        const owedUser = users.find(u => u.currentTotal > averageCost);
        users.forEach(user => {
            const costDiff = averageCost - user.currentTotal;
            if (costDiff > 0 && user.isActive) {
                result.push({
                    fromUserId: user.id,
                    fromUserName: user.name,
                    owedAmount: costDiff,
                    toUserId: owedUser.id,
                    toUserName: owedUser.name,
                });
            }
        });
        return result;
    }

    private getAverageCost(users: User[]): number {
        const totalCost = users.reduce(function (total, obj) { if (obj.isActive) { return total + obj.currentTotal; } }, 0);
        return totalCost / users.length;
    }
}
