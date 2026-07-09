import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Min, MinLength, MaxLength } from 'class-validator';

export class LoginAuthDto {

    @ApiProperty({description:'Correo del usuario', example: 'JosePerezLeon@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    pwUsuario!: string;
}