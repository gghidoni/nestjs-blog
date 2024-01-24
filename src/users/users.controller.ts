import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
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

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    // Esempio di dove vengono utilizzati una guardia custom e un decoratore custom
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Get(':id')
    async getUserById(@ValidateObjectId() id: string) {
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException('User not found', 404);
        return findUser;  
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async upddateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updatedUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updatedUser) throw new HttpException('User not found', 404);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }
}