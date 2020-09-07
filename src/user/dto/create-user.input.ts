import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail } from 'class-validator'
import { isString } from "util";

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.'})
  name: string;
  
  @IsEmail()
  @IsNotEmpty({ message: 'Campo e-mail não pode estar vazio.'})
  email: string;
}