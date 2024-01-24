import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule} from '@nestjs/config';
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/blog-db'),
    AuthModule,
    UserModule,
    PostsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
