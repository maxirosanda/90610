import { Injectable } from '@nestjs/common';


let users:{id:number,name:string,age:number}[]  = []

@Injectable()
export class UsersService {
  create(user:{name:string,age:number}) {
    const id:number = users.length + 1
    users.push({id,...user})
    return user;
  }

  findAll(limit:number) {
    const limitUsers = users.slice(0,limit)
    return limit ? limitUsers :users;
  }

  findOne(id: number) {
    const user:{id:number,name:string,age:number} | undefined = users.find(user => user.id === id ) 
    return user;
  }

  update(id:number,userBody:{id:number,name:string,age:number}) {
    users.map(user=> {
      if(user.id === id ) return (userBody)
      return user
    })
    return userBody;
  }

  remove(id: number) {
    users = users.filter(user => user.id !== id)
    console.log(users)
    return `This action removes a #${id} user`;
  }
}
