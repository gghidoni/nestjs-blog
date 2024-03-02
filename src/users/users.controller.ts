import { Body, Controller, Delete, Get, HttpException, Logger, NotFoundException, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "src/schemas/User.schema";
import { ValidateObjectId } from "src/auth/decorator/valid-id.decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UserController {
    logger: Logger = new Logger(UserController.name);
    
    constructor(private usersService: UsersService) {}

    // @Post('')
    // @UsePipes(new ValidationPipe())
    // createUser(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.createUser(createUserDto);
    // }

    @Get('')
    @ApiOperation({ summary: 'Get all users' })
    getUsers() {
        return this.usersService.getUsers();
    }

    // Esempio di dove vengono utilizzati una guardia custom e un decoratore custom
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Get('me')
    @ApiOperation({ summary: 'Get me', description: 'Get the current user authenticated by JWT' })
    getMe(@GetUser() user: User) {
        return user;
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'User ID' })
    @ApiOperation({ summary: 'Get user by ID' })
    async getUserById(@ValidateObjectId() id: string) {
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new NotFoundException(); 
        return findUser;  
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @ApiParam({ name: 'id', type: String, required: true, description: 'User ID' })
    @ApiOperation({ summary: 'Update user by ID' })
    async upddateUser(@ValidateObjectId() id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'User ID' })
    @ApiOperation({ summary: 'Delete user by ID' })
    async deleteUser(@ValidateObjectId('id') userId: string) {
        const deletedUser = await this.usersService.deleteUser(userId);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }
}