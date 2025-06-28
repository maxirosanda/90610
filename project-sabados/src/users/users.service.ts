import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {


  constructor(@InjectModel(User.name) private userModel: Model <UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto)
      return 'User created';
    } catch (error) {
      console.log(error.message)
      return "error"
    }
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findOne(id: string) {

    const user = await this.userModel.findOne({_id:id})
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    await this.userModel.updateOne({_id:id},{$set:updateUserDto})
    return `user updated`;
  }

  async remove(id: string) {
    await this.userModel.deleteOne({_id:id})
    return `User deleted`;
  }
}
