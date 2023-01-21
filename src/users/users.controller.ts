import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.userService.createUser(body);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found with that id!');
    }
    return user;
  }

  @Get('')
  async findAll() {
    const users = await this.userService.findAll();
    if (!users) {
      throw new NotFoundException('users not found!');
    }
    return users;
  }

  @Get('')
  async find(@Query('email') email: string) {
    const users = await this.userService.find(email);
    if (!users) {
      throw new NotFoundException('users not found!');
    }
    return users;
  }

  @Patch('/update/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('user not found with that id!');
    }
    return user;
  }
}
