import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { UsersService } from "src/users/users.service";
import { UserSettingsService } from "src/user-settings/user-settings.service";
import { UserModule } from "src/users/users.module";

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
        UserModule,
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}