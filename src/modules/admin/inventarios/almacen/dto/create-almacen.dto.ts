// create-almacen.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateAlmacenDto {

@ApiProperty({description: 'Nombre del almacén',example: 'Almacén Central',maxLength: 100})
@IsString({ message: 'El nombre debe ser un texto' })
@IsNotEmpty({ message: 'El nombre es obligatorio' })
@MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
Nombre!: string;

@ApiProperty({description: 'Código identificador del almacén',example: 'ALM-001',maxLength: 100,required: false})
@IsOptional()
@IsString({ message: 'El código del almacén debe ser un texto' })
@MaxLength(100, { message: 'El código del almacén no puede exceder los 100 caracteres' })
codigoAlmacen?: string;

@ApiProperty({description: 'Descripción del almacén',example: 'Almacén principal de repuestos y materia prima', required: false})
@IsOptional()
@IsString({ message: 'La descripción debe ser un texto' })
descripcion?: string;

@IsInt({ message: 'El id de la sucursal debe ser un número entero' })
@ApiProperty({description: 'ID de la sucursal a la que pertenece el almacén',example: 1})
@IsNotEmpty({ message: 'La sucursal es obligatoria' })
sucursalId!: number;

}
