import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings {
    @Prop()
    receiveNotifications?: boolean;

    @Prop()
    receiveEmails?: boolean;

    @Prop()
    receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);