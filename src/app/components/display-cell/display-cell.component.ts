import { TileState } from './../../services/game.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-cell',
  templateUrl: './display-cell.component.html',
  styleUrls: ['./display-cell.component.sass'],
})
export class DisplayCellComponent implements OnInit {
  @Input() letter!: string;
  @Input() state!: TileState;
  constructor() {}
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
  ngOnInit(): void {}
}
