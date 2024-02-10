import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {

    @ApiProperty({type: String, description: 'User email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: String, description: 'User password'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({type: String, description: 'User display name'})
    @IsOptional()
    @IsString()
    displayName?: string;

    @ApiProperty({type: String, description: 'User avatar url'})
    @IsOptional()
    @IsString()
    avatarUrl?: string;
}