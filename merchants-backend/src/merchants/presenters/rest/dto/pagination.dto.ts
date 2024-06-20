import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @IsPositive()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit: number;

  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @IsNumber()
  @Min(0)
  offset: number;
}
