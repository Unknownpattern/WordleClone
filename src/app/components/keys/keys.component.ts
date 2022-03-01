import {
  GameService,
  GameState,
  LetterState,
  TileState,
} from './../../services/game.service';
import { KeyboardService } from './../../services/keyboard.service';
import { KeyData } from './../types';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.sass'],
})
export class KeysComponent implements OnInit, OnDestroy {
  @Input() key!: string;
  state!: TileState;
  private StateSub!: Subscription;
  constructor(
    private keyboardService: KeyboardService,
    private gameService: GameService
  ) {}
  keyData!: KeyData;
  ngOnInit(): void {
    this.keyData = new KeyData(this.key);
    this.StateSub = this.gameService
      .getStatusObservable()
      .subscribe((LetterStateArr) => {
        if (LetterStateArr && this.key.length === 1) {
          let state = LetterStateArr[this.key.charCodeAt(0) - 97];
          this.keyData.disabled = state.state === TileState.Disabled;
          this.state = state.state;
        } else {
          this.state = TileState.Untouched;
        }
      });
  }
  classOutput() {
    switch (this.state) {
      case TileState.Absent:
        return 'Absent';
      case TileState.Present:
        return 'Present';
      case TileState.Correct:
        return 'Correct';
      case TileState.Untouched:
        return 'Untouched';
      default:
        return '';
    }
  }
  onClick() {
    if (!this.keyData.disabled) {
      this.keyboardService.keyClicked(this.key);
    }
  }

  ngOnDestroy(): void {
    this.StateSub.unsubscribe();
  }
}
