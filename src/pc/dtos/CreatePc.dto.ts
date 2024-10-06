import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { RomDto } from './Rom.dto';

export class CreatePcDto {
  @IsString()
  registrationNumber: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  manufacturer: string;

  @IsString()
  motherboard: string;

  @IsNumber()
  ram: number;

  @Type(() => RomDto)
  rom: RomDto;

  @IsString()
  cpu: string;

  @IsString()
  gpu: string;
}
