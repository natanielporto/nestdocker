import { InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateClientsInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Campo e-mail não pode estar vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo telefone não pode estar vazio.' })
  phone: string;
}
