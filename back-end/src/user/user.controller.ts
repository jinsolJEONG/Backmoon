import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create.user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) {
    const { UserID, Admin } = req.user;
    const user = await this.userService.findOne(UserID);
    return user;
  }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Request() req) {
    const user = await this.userService.findOne(req.user.UserID);
    return this.userService.deleteUser(user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Request() req,@Body() updateData:any) {
    const user = await this.userService.findOne(req.user.UserID);
    return this.userService.updateUser(user,updateData);
  }
}
