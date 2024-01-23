import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings } from './UserSettings.schema';
import mongoose from 'mongoose';
import { Post } from './Post.schema';

@Schema()
export class User {
    @Prop({ unique: true, required: true})
    email: string;

    @Prop({ unique: true, required: true})
    hash: string;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarUrl?: string;

    // Relazione 1 a 1
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings'})
    settings?: UserSettings;

    // Relazione 1 a molti
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);