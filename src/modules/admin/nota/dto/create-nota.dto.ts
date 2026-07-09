// create-nota.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt, MaxLength, IsIn, IsArray, Min, IsNumber, IsUUID, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";



export class CreateMovimientoDto {

    @ApiProperty({description: 'ID del producto sobre el que se hace el movimiento',example: 3,})
    @IsNotEmpty()
    @IsInt()
    producto_id!: number;

    @ApiProperty({description: 'ID del almacén donde se registra el movimiento',example: 1,})
    @IsNotEmpty()
    @IsInt()
    almacen_id!: number;

    @ApiProperty({description: 'Cantidad de producto que entra, sale o se devuelve',example: 10,})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    cantidad!: number;

    @ApiProperty({description: 'Tipo de movimiento de inventario',example: 'ingreso',enum: ['ingreso', 'salida', 'devolucion'],})
    @IsNotEmpty()
    @IsIn(['ingreso', 'salida', 'devolucion'])
    tipoMovimiento!: 'ingreso' | 'salida' | 'devolucion';

    @ApiPropertyOptional({description: 'Precio de compra unitario (aplica en movimientos de ingreso)',example: 150.50,})
    @IsOptional()
    @IsNumber()
    precioCompra!: number;

    @ApiPropertyOptional({description: 'Precio de venta unitario (aplica en movimientos de salida)',example: 200.00,})
    @IsOptional()
    @IsNumber()
    precioVenta!: number;

    @ApiPropertyOptional({description: 'Observaciones adicionales sobre el movimiento',example: 'Devolución por producto dañado',})
    @IsOptional()
    @IsString()
    observaciones?: string;
}

export class CreateNotaDto {

    @ApiProperty({description: 'Fecha de la nota',example: '2026-06-28',})
    @IsNotEmpty()
    @IsDateString()
    fecha!: string;

    @ApiProperty({description: 'Tipo de nota',example: 'compra',enum: ['compra', 'venta'],})
    @IsNotEmpty()
    @IsString()
    @IsIn(['compra', 'venta'])
    tipo_nota!: 'compra' | 'venta'

    @ApiProperty({description: 'Estado actual de la nota',example: 'pendiente',maxLength: 50,})
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    estadoNota!: string;

    @ApiPropertyOptional({description: 'Observaciones adicionales sobre la nota',example: 'Entrega parcial, falta confirmar el resto',})
    @IsOptional()
    @IsString()
    observaciones?: string;

    @ApiProperty({description: 'ID del usuario que crea la nota',example: 'b3f1c9a0-6e2d-4a8f-9c3e-1d2f3a4b5c6d',})
    @IsNotEmpty()
    @IsUUID()
    userId!: string;

    @ApiProperty({description: 'ID del cliente o proveedor asociado a la nota',example: 5,})
    @IsNotEmpty()
    @IsInt()
    clienteProveedorId!: number;

   @ApiProperty({ type: [CreateMovimientoDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMovimientoDto)
    movimientos!: CreateMovimientoDto[];

}
