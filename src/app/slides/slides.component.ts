import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Subject, forkJoin, timer, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { SlidesService } from '../service/slide.service';
import { CustomButtonConfig } from './../custom-button.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit, OnDestroy {
  private slideSubject: Subject<void> = new Subject();
  private slidesSubscription: Subscription | undefined;
  private timerSubscription: Subscription | undefined;
  config: CustomButtonConfig | undefined;
  dog0: string | undefined;
  dog1: string | undefined;
  dog2: string | undefined;
  dog3: string | undefined;
  value: boolean | undefined;

  constructor(private slidesService: SlidesService) { }

  ngOnInit() {
    // custom-button
    this.config = {
      state: true,
      onText: 'Start',
      offText: 'Stop',
    };
  }

  showSlides() {
    let dogUrl_1 = this.slidesService.getImages().pipe(tap(dog => (this.dog0 = dog.message)));
    let dogUrl_2 = this.slidesService.getImages().pipe(tap(dog => (this.dog1 = dog.message)));
    let dogUrl_3 = this.slidesService.getImages().pipe(tap(dog => (this.dog2 = dog.message)));
    let dogUrl_4 = this.slidesService.getImages().pipe(tap(dog => (this.dog3 = dog.message)));

    this.slidesSubscription = this.slideSubject
      .pipe(
        mergeMap(() => {
          return forkJoin([dogUrl_1, dogUrl_2, dogUrl_3, dogUrl_4]);
        })
      )
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        this.timerSubscription = timer(5000).subscribe(() => {
          this.slideSubject.next();
        });
      });

    this.slideSubject.next();
  }

  onStateChanged(value: boolean) {
    this.value = value;

    if (!value) this.showSlides();
    else this.onUnsubscribe();
  }

  onUnsubscribe() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      console.info('timerSubscription unsubscribed');
    }
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
      console.info('slidesSubscription unsubscribed');
    }

    console.info(new Date().toLocaleTimeString());
  }

  ngOnDestroy() {
    this.onUnsubscribe();
  }
}
