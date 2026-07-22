import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from './constants'


@Injectable()
export class AuthGuard implements CanActivate {     //https://docs.nestjs.com/security/authentication

//inyeccion de dependencia:
constructor(private readonly jwtService: JwtService) {}

async canActivate(context: ExecutionContext,): Promise<boolean>  {
  
  const request = context.switchToHttp().getRequest();   //Documentacion de Nest seguridad/autenticacion  
  //Man, dame el request de esta petición HTTP para poder inspeccionarlo.  
  
  const [type, token] = request.headers.authorization?.split(' ') ?? [];  //Documentacion de Nest seguridad/autenticacion  
  //para ese man que esta ingresando, verifica si su type === bearer y su token = sbfdsbfsdbfisdfosd son validos:
  
  if (!token)   //Si el token no existe: 
  {
      throw new UnauthorizedException(); // Lanza este error
  }
  
  try
  {
    const payload = await this.jwtService.verifyAsync(token,{secret: jwtConstants.secret});
    // Aqui con el payload es donde realmente se confirma que el token es legítimo, no falsificado:
    request['user'] = payload
  }catch(error)
  {
     throw new UnauthorizedException();
  }  
  
        return true;
  }}
