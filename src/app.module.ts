import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_db_user',
      password: 'your_db_password',
      database: 'zomato_clone_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), AuthModule, UserModule, RestaurantModule, FoodModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
