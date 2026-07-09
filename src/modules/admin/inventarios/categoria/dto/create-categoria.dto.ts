import {IsNotEmpty,IsOptional,IsString,MaxLength} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class CreateCategoriaDto {

  @ApiProperty({example: 'Detergentes',description: 'Nombre de la categoría'})
  @IsString({message: 'El nombre debe ser una cadena de texto'})
  @IsNotEmpty({message: 'El nombre es obligatorio'})
  @MaxLength(100, {message: 'El nombre no puede exceder los 100 caracteres'})
  nombre!: string;

  @ApiPropertyOptional({example: 'Productos utilizados para el lavado de ropa',description: 'Descripción de la categoría'})
  @IsOptional()
  @IsString({message: 'La descripción debe ser una cadena de texto'})
  Descripcion?: string;

}
