import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { KeysComponent } from './components/keys/keys.component';
import { DisplayComponent } from './components/display/display.component';
import { DisplayCellComponent } from './components/display-cell/display-cell.component';
import { MessageDisplayComponent } from './components/message-display/message-display.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeysComponent,
    DisplayComponent,
    DisplayCellComponent,
    MessageDisplayComponent,
  ],
  imports: [BrowserModule, NoopAnimationsModule, MatSnackBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
