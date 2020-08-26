import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@quicken-interview/api-interfaces';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {

    }
  @Get()
  findAll(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param() id: string): User {
    return this.userService.getOneUser(id);
  }

  @Put()
  updateOne(@Body() user: UsersDto): User {
    return this.userService.updateUser(user);
  }

  @Post()
  create(@Body() user: UsersDto): User {
    return this.userService.createUser(user);
  }

  //Removed as it was not specified in the assignment
//   @Delete(':id')
//   @ApiOperation({ description: "Delete a user by their ID, returns TRUE if success, returns FALSE on failure", operationId: "Delete" })
//   delete(@Param('id') id): boolean {
//       // Do we want to hard delete users?
//       // Do we want to soft delete users?
//       // Do we need to maintain users for history and calculations? Not sure...
//     return this.userService.deleteUser(id);
//   }
}
