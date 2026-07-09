import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    
        //Para Swagger
        @ApiProperty({description:'Nombre del usuario', example: 'Usuario'})
        //Dto
        @IsNotEmpty()
        @IsString({message: "El nombre de usuario debe de ser cadena de texto"})
        @MaxLength(20, {message: "el nombre de usuario no debe de exceder los 20 caracteres"})
        @MinLength(10, {message: "el nombre de usuario debe tener al menos 10 caracteres"})
        name!: string;
    
        @ApiProperty({description:'Correo del usuario', example: 'Usuario@mail.com'})
        //Dto
        @IsNotEmpty()
        @IsEmail({},{message: "El correo electronico no tiene un formato valido"})
        email!: string;
        
        @ApiProperty()

        @IsNotEmpty()
        @IsString({message: "La contraseña debe de ser una cadena de texto"})
        @MaxLength(20, {message: "el nombre de usuario no debe de exceder los 20 caracteres"})
        @MinLength(5, {message: "el nombre de usuario debe tener al menos 5 caracteres"})
        password!: string;  

    
    }
    



