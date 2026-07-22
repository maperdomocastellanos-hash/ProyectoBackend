import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService) {}

    // 1. Buscar usuario por email. emailUsuario y passwordUsuario tendrán uso
    // al crear el formulario de login del usuario para ingresar a la plataforma.

    async funLogin(correoLogin: string, passwordLogin:string) 
    {
        const datosDelUsuario = await this.usersService.ExtraerDatosPorEmail(correoLogin); 
        // Anda pa' sha bobo y buscarme las credenciales de esta persona por medio de su email
        
        if (!datosDelUsuario) 
        {
            throw new HttpException('Usuario no existe', 404);
        }

        // 2. Verificar la contraseña
        // En el paso anterior buscamos toda la info del usuario a partir del email,
        // es decir, datosDelUsuario recibe toda la info de esa persona.

        // El compare
        const verificarPass = await compare(passwordLogin, datosDelUsuario.password);
        if (!verificarPass) 
        {
            throw new HttpException('Contraseña incorrecta', 401);
        }

        // TODO: aquí va la generación del JWT (Json Web Token) más adelante
        
        //Segun modelo de documentacion: 
        const payload = 
        { 
            sub: datosDelUsuario.Id, 
            email: datosDelUsuario.email
        }

        const access_token= await this.jwtService.signAsync(payload);

        return { access_token };

}}



//Anotaciones importantes

// datosDelUsuario.password - lo que se captura ahi ya es estatico porque proviene del elemento insertado en el CRUD funcion Mostrar

// Credenciales.pwUsuario → Esto es dinámico, cambia cada vez que alguien intenta loguearse. 
// Es literalmente lo que la persona teclea en el campo de "Contraseña" del formulario, 
// en ese momento, en texto plano.
