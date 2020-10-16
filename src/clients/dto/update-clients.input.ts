import { InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

@InputType()
export class UpdateClientsInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Campo e-mail não pode estar vazio.' })
  @IsOptional()
  email?: string;

  @IsPhoneNumber('55')
  @IsNotEmpty({ message: 'Campo telefone não pode estar vazio.' })
  @IsOptional()
  phone?: string;
}
