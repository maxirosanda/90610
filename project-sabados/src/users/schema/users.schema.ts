import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required:true})
  firstName: string;

  @Prop({required:true})
  lastName: string;

  @Prop()
  age:number;

  @Prop({required:true,unique:true})
  email: string;

  @Prop({required:true})
  password:string;

  @Prop({default:"user"})
  role:string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Pets', default: [] })
  pets: mongoose.Types.ObjectId[];

  @Prop()
  last_connection: Date

  @Prop({default:[]})
  documents:[{name:string,reference:string}]

}



export const UserSchema = SchemaFactory.createForClass(User);