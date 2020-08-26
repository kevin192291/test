import { User } from '@quicken-interview/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto implements User {
    @ApiProperty({ type: String, required: false })
    id: string;
    @ApiProperty({ type: String, required: true })
    name: string;
    @ApiProperty({ type: [Number], required: false })
    expense: number[];
    @ApiProperty({ type: String, required: false })
    isActive: boolean;
    @ApiProperty({ type: Number, required: false })
    currentTotal: number;
}