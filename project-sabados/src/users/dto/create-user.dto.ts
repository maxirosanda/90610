import { IsEmail,IsNotEmpty,IsNumber,IsString,IsOptional } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsNumber()
    @IsOptional()
    age:number

    @IsString()
    @IsNotEmpty()
    password:string

    @IsEmail()
    @IsNotEmpty()
    email:string
}
