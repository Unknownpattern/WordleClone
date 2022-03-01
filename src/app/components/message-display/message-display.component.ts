import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.sass'],
})
export class MessageDisplayComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.gameService.getMessageObservable().subscribe((message) => {
      this.snackBar.open(message, '', { duration: 2000 });
    });
  }
}
