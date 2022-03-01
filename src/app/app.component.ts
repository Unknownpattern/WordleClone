import { KeyboardService } from './services/keyboard.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  sub!: Subscription;
  constructor(private keyboardService: KeyboardService) {}
  ngAfterViewInit(): void {
    this.sub = fromEvent(window, 'keyup').subscribe((res: any) => {
      const letterIndex = res.key.charCodeAt(0) - 97;
      if ((letterIndex >= 0 && letterIndex < 26) || res.key === 'Enter') {
        this.keyboardService.keyClicked(res.key);
      } else if (res.key === 'Backspace') {
        this.keyboardService.keyClicked('Delete');
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
