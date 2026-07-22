import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../admin/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: 
  [
    UsersModule,  // exportamos en users.module.ts e importamos en --> auth.module.ts

    //segun documentacion: /seguridad/autenticacion: 
    JwtModule.register
    ({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],     
   
  providers: [AuthService],
  controllers: [AuthController],
  
  
  exports: [AuthService],
})

export class AuthModule {}
