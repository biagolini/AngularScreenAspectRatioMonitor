import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription | undefined;

  pageWidth: number = 1280;
  pageHeight: number = 720;

  displayWidth: number = 320;
  displayHeight: number = 180;
  screenType: string = '';

  resolveScreenType(): string {
    let ratio = this.pageWidth / this.pageHeight;
    if (ratio <= 0.958) {
      return 'Smartphone';
    } else if (ratio <= 1.64) {
      return 'Tablet';
    } else if (ratio <= 2) {
      return 'Old standard';
    } else if (ratio <= 3) {
      return 'Modern standard';
    } else if (ratio <= 4) {
      return 'Ultrawide';
    } else {
      return 'Superwide';
    }
  }

  updateSizeData() {
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this.displayWidth = this.pageWidth / 2;
    this.displayHeight = this.pageHeight / 2;
  }

  ngOnInit() {
    this.updateSizeData();
    this.screenType = this.resolveScreenType();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.updateSizeData();
      this.screenType = this.resolveScreenType();
    });
  }
}
