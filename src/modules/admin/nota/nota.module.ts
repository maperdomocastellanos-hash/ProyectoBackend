import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { User } from '../users/entities/user.entity';
import { ClienteProveedor } from '../cliente-proveedor/entities/cliente-proveedor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Nota, User, ClienteProveedor])],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
