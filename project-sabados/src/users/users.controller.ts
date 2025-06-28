import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    if(response === "error"){
      throw new HttpException("error created",500)
    }
    return {status:"success",message:response}
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return {status:"success",payload:users};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {status:"success",payload:user}
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message = await this.usersService.update(id, updateUserDto);
    return {status:"success",message}

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const message = await this.usersService.remove(id);
    return {status:'success',message}
  }
}
