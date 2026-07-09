import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@ApiBearerAuth()

@Controller('auth')
export class AuthController {
    

    // Todo este esquema esta en la documentacion ...Seguridad/autenticacion::
    constructor(private readonly authService: AuthService) {}

    @Post("v1/autenticacion/login")
    funIngresarCredenciales(@Body() Credenciales: LoginAuthDto) {
    return this.authService.funLogin(Credenciales.email, Credenciales.pwUsuario);
    //documentacion --> return this.authService.signIn(signInDto.username, signInDto.password)
    }}