import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketSheetComponent } from './basket-sheet.component';

describe('BasketSheetComponent', () => {
  let component: BasketSheetComponent;
  let fixture: ComponentFixture<BasketSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketSheetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
