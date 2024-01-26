import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { UserSettingsDto } from "src/user-settings/dto/UserSettings.dto";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserSettingsDto)
    settings?: UserSettingsDto};