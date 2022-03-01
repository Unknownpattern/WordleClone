import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { WordList, GuessList } from './wordlist';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameStatus = GameState.Playing;
  private GameStatus: BehaviorSubject<GameState> =
    new BehaviorSubject<GameState>(this.gameStatus);
  private boardState = ['', '', '', '', '', ''];
  private evaluations: TileState[][] | null[] = [
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  messageSubject = new Subject<string>();
  private Evaluations: BehaviorSubject<TileState[][] | null[]> =
    new BehaviorSubject(this.evaluations);
  private letterState!: LetterState[];
  private LetterState = new BehaviorSubject<LetterState[]>([]);
  private board = new BehaviorSubject<string[]>(this.boardState);

  rowIndex = 0;
  secretWord = '';

  constructor() {
    this.NewGame();
  }
  NewGame(): void {
    this.secretWord = WordList[Math.floor(Math.random() * WordList.length)];
    // this.secretWord = 'taunt';
    console.log(this.secretWord);
    this.rowIndex = 0;
    this.evaluations = [null, null, null, null, null, null];
    this.boardState = ['', '', '', '', '', ''];
    this.letterState = [];
    for (let i = 0; i < 26; i++) {
      this.letterState.push({
        letter: String.fromCharCode(97 + i),
        state: TileState.Untouched,
      });
    }
    this.LetterState.next(this.letterState);
    this.board.next(this.boardState);
    this.Evaluations.next(this.evaluations);
    this.gameStatus = GameState.Playing;
  }

  AddLetter(key: string): void {
    if (this.gameStatus === GameState.Playing) {
      if (this.boardState[this.rowIndex].length >= 5) {
        return;
      } else {
        this.boardState[this.rowIndex] += key;
      }
      this.board.next(this.boardState);
    }
  }

  DeleteLetter(): void {
    if (this.gameStatus === GameState.Playing) {
      if (this.boardState[this.rowIndex].length === 0) {
        return;
      } else {
        this.boardState[this.rowIndex] = this.boardState[this.rowIndex].slice(
          0,
          -1
        );
      }
      this.board.next(this.boardState);
    }
  }

  EnterWord(): void {
    const currWord = this.boardState[this.rowIndex];
    if (currWord.length !== 5) {
      return;
    }

    // if the current guessed word is a valid word
    if (!GuessList.includes(currWord) && !WordList.includes(currWord)) {
      console.log('Error, not in word list');
      this.messageSubject.next('Error, not in word list');
      // TODO: Error message
      return;
    }

    if (this.verify()) {
      this.gameOver(true);
      return;
    }
    this.rowIndex++;
    if (this.rowIndex === 6) {
      this.gameOver(false);
    }
  }

  private verify(): Boolean {
    const currWordArr = this.boardState[this.rowIndex].split('');
    if (currWordArr.length !== 5) {
      return false;
    }
    let allCorrect = true;
    const secretWordArr = this.secretWord.split('');
    const secretWordBank = this.secretWord.split('');
    const resArr: TileState[] = [];

    currWordArr.forEach((letter, index) => {
      if (secretWordArr[index] === letter) {
        const index = secretWordBank.findIndex((ele) => {
          return ele === letter;
        });
        secretWordBank.splice(index, 1);
        this.letterState[letter.charCodeAt(0) - 97].state = TileState.Correct;
        resArr.push(TileState.Correct);
      } else {
        resArr.push(TileState.Absent);
      }
    });

    currWordArr.forEach((letter, index) => {
      if (
        resArr[index] !== TileState.Correct &&
        secretWordBank.includes(letter)
      ) {
        const letterIndex = secretWordBank.findIndex((ele) => {
          return ele === letter;
        });
        secretWordBank.splice(letterIndex, 1);
        this.letterState[letter.charCodeAt(0) - 97].state = TileState.Present;
        allCorrect = false;
        resArr[index] = TileState.Present;
      } else if (
        resArr[index] !== TileState.Correct &&
        (!secretWordArr.includes(letter) || !secretWordBank.includes(letter))
      ) {
        this.letterState[letter.charCodeAt(0) - 97].state = TileState.Absent;
        resArr[index] = TileState.Absent;
        allCorrect = false;
      }
    });

    this.evaluations[this.rowIndex] = resArr;
    this.LetterState.next(this.letterState);
    this.Evaluations.next(this.evaluations);
    return allCorrect;
  }

  private gameOver(won: Boolean) {
    this.gameStatus = GameState.Finished;
    this.GameStatus.next(this.gameStatus);
    const gameOverMessage = 'GAME OVER, ' + (won ? 'You Won!' : 'You lost...');
    this.messageSubject.next(gameOverMessage);
    console.log(gameOverMessage);
  }

  getWordList(): Observable<string[]> {
    return this.board.pipe(
      map((arr) => {
        let newArr = arr.map((value) => {
          while (value.length < 5) {
            value += ' ';
          }
          return value;
        });
        return newArr;
      })
    ) as Observable<string[]>;
  }

  getEvaluationObservable(): Observable<TileState[][]> {
    return this.Evaluations.pipe(
      map((value) => {
        value.forEach((wordArr, index) => {
          if (wordArr === null) {
            value[index] = [
              TileState.Untouched,
              TileState.Untouched,
              TileState.Untouched,
              TileState.Untouched,
              TileState.Untouched,
            ];
          }
        });
        return value;
      })
    ) as Observable<TileState[][]>;
  }
  getStatusObservable(): Observable<LetterState[]> {
    return this.LetterState as Observable<LetterState[]>;
  }
  getMessageObservable(): Observable<string> {
    return this.messageSubject as Observable<string>;
  }
}
export enum GameState {
  Finished = 0,
  Playing,
}

export enum TileState {
  Untouched,
  Absent,
  Present,
  Correct,
  Disabled,
}
export interface LetterState {
  letter: String;
  state: TileState;
}
