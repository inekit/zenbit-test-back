import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form/dbEntities/form.entry';
import { User } from './form/dbEntities/user.entry';
import 'dotenv/config'

@Module({
  imports: [
    FormModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST ?? '62.109.12.174',
      port: 3306,
      username: process.env.USERNAME ?? 'newuser',
      password: process.env.PASSWORD ?? 'NicklzX.39',
      database: process.env.DATEBASE ?? 'zenbit',
      entities: [Form, User],
      //synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
