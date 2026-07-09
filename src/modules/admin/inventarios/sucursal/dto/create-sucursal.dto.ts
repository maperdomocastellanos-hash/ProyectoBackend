// create-sucursal.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSucursalDto {

    @ApiProperty({description: 'Nombre de la sucursal',example: 'Sucursal Centro',maxLength: 100})
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre!: string;

    @ApiProperty({description: 'Dirección física de la sucursal',example: 'Barrio El Centro, 3a Calle, San Pedro Sula',maxLength: 255})
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    direccion!: string;

    @ApiProperty({description: 'Número de teléfono de la sucursal',example: '+504 2552-1234',maxLength: 22})
    @IsString()
    @IsNotEmpty()
    @MaxLength(22)
    telefono!: string;

    @ApiProperty({description: 'Ciudad donde se ubica la sucursal',example: 'San Pedro Sula',maxLength: 100})
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    ciudad!: string;

}