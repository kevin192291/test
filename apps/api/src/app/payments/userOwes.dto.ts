import { UserOwes, User } from '@quicken-interview/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UserOwesDto implements UserOwes {
    @ApiProperty({ type: String, required: true })
    fromUserId: string;
    @ApiProperty({ type: String, required: true })
    fromUserName: string;
    @ApiProperty({ type: Number, required: true })
    owedAmount: number;
    @ApiProperty({ type: String, required: true })
    toUserId: string;
    @ApiProperty({ type: String, required: true })
    toUserName: string;
    
}