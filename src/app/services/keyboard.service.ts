import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  constructor(private gameService: GameService) {}
  keyClicked(key: string): void {
    switch (key) {
      case 'Enter':
        this.gameService.EnterWord();
        break;
      case 'Delete':
        this.gameService.DeleteLetter();
        break;

      default:
        this.gameService.AddLetter(key);
        break;
    }
  }
}
