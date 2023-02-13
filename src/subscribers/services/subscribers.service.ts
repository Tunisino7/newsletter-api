import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { from, Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Repository } from "typeorm";
import { SubscriberEntity } from "../models/subscribers.entity";
import { Subscriber, CreateSubscriber } from "../models/subscribers.class";

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly subscriptionRepository: Repository<SubscriberEntity>
  ) {}

  doesSubscriberExist(email: string): Observable<boolean> {
    return from(this.subscriptionRepository.findOne({ where: { email } })).pipe(
      switchMap((subscription: CreateSubscriber) => {
        return of(!!subscription);
      })
    );
  }

  createSubscriber(subscription: CreateSubscriber): Observable<Subscriber> {
    const {
      subscriberCountry,
      subscriberName,
      frequency,
      email,
      subscriptionTime,
    } = subscription;

    return this.doesSubscriberExist(email).pipe(
      tap((doesSubExist: boolean) => {
        if (doesSubExist)
          throw new HttpException(
            "A subscription has already been created with this email address",
            HttpStatus.BAD_REQUEST
          );
      }),
      switchMap(() => {
        return from(
          this.subscriptionRepository.save({
            subscriberCountry,
            subscriberName,
            frequency,
            email,
            subscriptionTime,
            isEmailVerified: false,
          })
        ).pipe(
          map((subscription: Subscriber) => {
            return subscription;
          })
        );
      })
    );
  }

  getSubscribers(): Observable<Subscriber[]> {
    const subscribers = from(this.subscriptionRepository.find());
    return subscribers;
  }
}
