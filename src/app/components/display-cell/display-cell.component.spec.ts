import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCellComponent } from './display-cell.component';

describe('DisplayCellComponent', () => {
  let component: DisplayCellComponent;
  let fixture: ComponentFixture<DisplayCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
