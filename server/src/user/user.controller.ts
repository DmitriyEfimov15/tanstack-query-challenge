import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const _limit = limit ? parseInt(limit, 10) : undefined;
    const _offset = offset ? parseInt(offset, 10) : undefined;

    return this.userService.getAllUsers(_limit, _offset);
  }

  @Put('/update/:userId')
  updateUser(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }

  @Post('/create')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Delete('/delete')
  deleteUser(@Param() userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get('/one-user')
  getOneUser(@Query('userId') userId: string) {
    return this.userService.getOneUser(userId);
  }
}
