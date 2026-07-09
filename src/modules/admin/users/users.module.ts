import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // esto faltaba
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],   // VER DOCUMENTACION NEST - SEGURIDAD / AUTENTICACION
})
export class UsersModule {}