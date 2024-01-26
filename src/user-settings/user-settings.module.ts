import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';
import { UsersService } from 'src/users/users.service';

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
    controllers: [UserSettingsController],
    providers: [UserSettingsService],
    exports: [UserSettingsService]
})
export class UserSettingsModule {}
