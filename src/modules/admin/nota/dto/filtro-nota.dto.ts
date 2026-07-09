import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min} from "class-validator";

export class filtroNotadto{

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    tipo_nota!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    estadoNota!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    desde!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    hasta!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    user!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    clienteproveedor?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @IsString()
    @Min(1)
    limit!: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @IsString()
    @Min(1)
    page?: number;



}