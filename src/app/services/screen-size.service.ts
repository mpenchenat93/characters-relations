// src/app/services/screen-size.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private screenWidth = new BehaviorSubject<number>(window.innerWidth);
  screenWidth$ = this.screenWidth.asObservable();

  constructor() {
    this.updateScreenWidth();
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.updateScreenWidth());
  }

  private updateScreenWidth(): void {
    this.screenWidth.next(window.innerWidth);
  }
}
