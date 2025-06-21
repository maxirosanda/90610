import { Controller, Get, Post, Body, Param, Delete,Put,Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() bodyUser:{name:string,age:number}) {

    return this.usersService.create(bodyUser);
  }

  @Get()
  findAll(@Query('limit') limit?: string) {
    return this.usersService.findAll(Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser:{id:number,name:string,age:number}) {
    return this.usersService.update(Number(id),updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
