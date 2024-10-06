import { IsOptional } from 'class-validator';

export class CreateUserDto {
  userId: string;

  firstName: string;

  lastName: string;

  @IsOptional()
  patronymic?: string;

  @IsOptional()
  pc?: string[];
}
