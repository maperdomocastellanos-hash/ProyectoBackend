import { PartialType } from '@nestjs/swagger';
import { CreateClienteProveedorDto } from './create-cliente-proveedor.dto';

export class UpdateClienteProveedorDto extends PartialType(CreateClienteProveedorDto) {}
