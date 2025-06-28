import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import { MongooseModule } from '@nestjs/mongoose';
import FirstMiddleware from './middlewares/first.middleware';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, PetsModule, AdoptionsModule,ConfigModule.forRoot(),MongooseModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (config:ConfigService) => ({
      uri:config.get<string>('URI_MONGO')
    })
  })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path:"*",method:RequestMethod.ALL})
  }
}
