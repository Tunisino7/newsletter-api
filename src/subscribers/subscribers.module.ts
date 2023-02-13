import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscribersService } from './services/subscribers.service';
import { SubscriberController } from './controllers/subscribers.controller';
import { SubscriberEntity } from './models/subscribers.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriberEntity]),
  ],
  providers: [SubscribersService],
  controllers: [SubscriberController],
  exports: [SubscribersService],
})
export class SubscriberModule {}
