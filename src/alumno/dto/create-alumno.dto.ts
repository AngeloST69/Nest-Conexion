import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  edad?: string;

  @IsString()
  @IsOptional()
  materia?: string;
}
