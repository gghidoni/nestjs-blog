import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { UserSettingsService } from "src/user-settings/user-settings.service";
import { UserSettingsModule } from "src/user-settings/user-settings.module";

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
        UserSettingsModule
    ],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}