import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketViewerComponent } from './basket-viewer.component';

describe('BasketViewerComponent', () => {
  let component: BasketViewerComponent;
  let fixture: ComponentFixture<BasketViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketViewerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
