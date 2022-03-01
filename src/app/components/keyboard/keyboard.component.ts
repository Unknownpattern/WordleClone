import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass'],
})
export class KeyboardComponent implements OnInit {
  KeyListRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  KeyListRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  KeyListRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  constructor(private gameService: GameService) {}
  newGame() {
    this.gameService.NewGame();
  }
  ngOnInit(): void {}
}
