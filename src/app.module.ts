import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule} from '@nestjs/config';
import { UserSettingsModule } from './user-settings/user-settings.module';

 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/blog-db'),
    ConfigModule.forRoot({ isGlobal: true }),
    UserSettingsModule,
    AuthModule,
    UserModule,
    PostsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
