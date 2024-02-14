import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { HouseModule } from './house/house.module';

 
@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:27018/blog-db'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true,  }),
    UserSettingsModule,
    AuthModule,
    UserModule,
    PostsModule,
    HouseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
