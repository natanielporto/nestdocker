import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.'})
  @IsOptional()
  name?: string;
  
  @IsEmail()
  @IsNotEmpty({ message: 'Campo e-mail não pode estar vazio.'})
  @IsOptional()
  email?: string;
}