import { TileState } from './../services/game.service';
export class KeyData {
  constructor(key: string) {
    this.key = key;
    this.state = TileState.Untouched;
    this.disabled = false;
  }
  key: string;
  state: TileState;
  disabled: boolean;
}
enum KeyState {
  Default,
  NotIn,
  In,
}
