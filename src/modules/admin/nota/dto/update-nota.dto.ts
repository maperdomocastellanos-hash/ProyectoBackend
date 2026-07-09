import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsArray,IsDateString,IsEnum,IsInt,IsNumber,IsOptional,IsPositive,IsString,IsUUID,Min,ValidateNested,} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovimientoDto {
  @ApiProperty({description: 'ID del movimiento a actualizar',example: 1,})
  @IsInt()
  @IsPositive()
  id!: number;

  @ApiPropertyOptional({description: 'ID del producto asociado al movimiento',example: 42,})
  @IsOptional()
  @IsInt()
  @IsPositive()
  producto_id?: number;

  @ApiPropertyOptional({description: 'ID del almacén asociado al movimiento',example: 3,})
  @IsOptional()
  @IsInt()
  @IsPositive()
  almacen_id?: number;

  @ApiPropertyOptional({description: 'Cantidad de unidades del movimiento',example: 10,minimum: 0,})
  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidad?: number;

  @ApiPropertyOptional({description: 'Tipo de movimiento',enum: ['ingreso', 'salida', 'devolucion'],example: 'ingreso',})
  @IsOptional()
  @IsEnum(['ingreso', 'salida', 'devolucion'])
  tipoMovimiento?: 'ingreso' | 'salida' | 'devolucion';

  @ApiPropertyOptional({description: 'Precio de compra del producto', example: 150.5, minimum: 0,})
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioCompra?: number;

  @ApiPropertyOptional({description: 'Precio de venta del producto',example: 200.0,minimum: 0,})
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioVenta?: number;

  @ApiPropertyOptional({description: 'Observaciones adicionales del movimiento',example: 'Mercancía en buen estado',})
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateNotaDto {
  @ApiPropertyOptional({description: 'ID del usuario responsable de la nota',example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',})
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({description: 'ID del cliente o proveedor asociado',example: 7,})
  @IsOptional()
  @IsInt()
  @IsPositive()
  clienteProveedorId?: number;

  @ApiPropertyOptional({description: 'Fecha de la nota en formato ISO 8601',example: '2025-06-29',})
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiPropertyOptional({description: 'Tipo de nota',example: 'compra',})
  @IsOptional()
  @IsString()
  tipo_nota?: string;

  @ApiPropertyOptional({description: 'Estado actual de la nota',example: 'pendiente',})
  @IsOptional()
  @IsString()
  estadoNota?: string;

  @ApiPropertyOptional({description: 'Observaciones generales de la nota',example: 'Pedido urgente para fin de mes',})
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({description: 'Lista de movimientos asociados a la nota',type: () => [UpdateMovimientoDto],})
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMovimientoDto)
  movimientos?: UpdateMovimientoDto[];
}