import { Body, Controller, Post } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { ValidateObjectId } from 'src/auth/decorator/valid-id.decorator';

@Controller('user-settings')
export class UserSettingsController {

    constructor(
        private userSettingsService: UserSettingsService
    ) {}


}
