import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";

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
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}