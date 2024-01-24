import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { UsersService } from "src/users/users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: User.name, 
                schema: UserSchema, 
            },
            {
                name: UserSettings.name,
                schema: UserSettingsSchema
            }
        ]),
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersService],
})
export class AuthModule {}