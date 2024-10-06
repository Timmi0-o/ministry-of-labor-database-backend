import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  allUsers() {
    return this.userService.getAllUsers();
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('delete')
  deleteUser(@Body('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Post('add-pc')
  addPCToUser(@Body('idUser') idUser: string, @Body('idPc') idPc: string) {
    return this.userService.addPcToUser(idUser, idPc);
  }

  @Post('delete-pc')
  deletePCToUser(@Body('idUser') idUser: string) {
    return this.userService.deletePcToUser(idUser);
  }
}
