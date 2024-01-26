import { IsBoolean, IsOptional } from "class-validator";

export class UserSettingsDto {
    @IsBoolean()
    @IsOptional()
    receiveNotifications?: boolean;

    @IsBoolean()
    @IsOptional()
    receiveEmails?: boolean;

    @IsBoolean()
    @IsOptional()
    receiveSMS?: boolean;
}