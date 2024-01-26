import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UserSettingsService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
    ) {}

    getUserSettingsByUserId(userId: string) {
        return userId;
    }

}
