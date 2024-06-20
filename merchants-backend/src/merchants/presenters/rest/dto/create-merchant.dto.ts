import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logoUrl: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsObject()
  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;
}
