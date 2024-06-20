import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
