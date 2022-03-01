import { Observable, Subscription } from 'rxjs';
import { GameService, TileState } from './../../services/game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.sass'],
})
export class DisplayComponent implements OnInit, OnDestroy {
  constructor(private gameService: GameService) {}
  boardState$!: Observable<string[]>;
  evaluations!: TileState[][];
  private evalSub!: Subscription;
  ngOnInit(): void {
    this.boardState$ = this.gameService.getWordList();
    this.evalSub = this.gameService
      .getEvaluationObservable()
      .subscribe((evalu) => {
        this.evaluations = evalu;
      });
  }
  trackByLevel1(index: number, item: any) {
    return index;
  }
  ngOnDestroy(): void {
    this.evalSub.unsubscribe();
  }
}
