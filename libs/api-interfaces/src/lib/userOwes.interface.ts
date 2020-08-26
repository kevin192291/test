import { User } from './user.interface';

export interface UserOwes {
    fromUserId: string;
    fromUserName: string;
    owedAmount: number;
    toUserId: string;
    toUserName: string;
}