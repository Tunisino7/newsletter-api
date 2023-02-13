import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Subscriber, CreateSubscriber } from '../models/subscribers.class';
import { SubscribersService } from '../services/subscribers.service';

@Controller('subscribers')
@ApiTags('subscribers')
export class SubscriberController {
  constructor(private subscribersService: SubscribersService) {}

  @Post('/')
  @ApiOperation({ summary: 'Subscribe' })
  @ApiResponse({ status: 201, description: 'Subscriber created.' })
  subscribe(@Body() subscriber: CreateSubscriber): Observable<Subscriber> {
    return this.subscribersService.createSubscriber(subscriber);
  }

  @Get('/')
  @ApiOperation({ summary: 'Fetch all subscribers' })
  @ApiResponse({
    status: 200,
    description: 'Subscribers fetched successfuly',
    type: Subscriber,
    isArray: true
  })
  viewSubscribers(): Observable<Subscriber[]> {
    return this.subscribersService.getSubscribers();
  }
}
