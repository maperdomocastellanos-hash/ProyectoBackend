import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClienteProveedorDto {
  @ApiProperty({enum: ['cliente','proveedor'], example: 'cliente',description: 'Tipo de registro',})
  @IsEnum(['cliente','proveedor'], {message: 'tipo debe ser "Cliente" o "Proveedor"',})
  @IsNotEmpty()
  tipo!: 'Cliente' | 'Proveedor';

  @ApiProperty({example: 'Distribuidora Honduras S.A. de C.V.', description: 'Nombre o razón social',})
  @IsString()
  @IsNotEmpty({ message: 'razonSocial es obligatorio' })
  razonSocial!: string;

  @ApiProperty({example: '0801-1990-12345', maxLength: 100, required: false,})
  @IsOptional()
  @IsString()
  @MaxLength(100)
  identificacion?: string;

  @ApiProperty({example: '9999-9999',  maxLength: 20, required: false,})
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({example: 'Col. Las Hadas, San Pedro Sula', maxLength: 200, required: false,})
  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @ApiProperty({example: 'contacto@empresa.com',maxLength: 200,required: false,})
  @IsOptional()
  @IsEmail({}, { message: 'correo debe tener un formato válido' })
  @MaxLength(200)
  correo?: string;

  @ApiProperty({example: true,description: 'Estado activo/inactivo',default: true,})
  @IsBoolean()
  @IsNotEmpty()
  estado!: boolean;
}