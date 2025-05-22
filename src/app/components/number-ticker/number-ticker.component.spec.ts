import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTickerComponent } from './number-ticker.component';

describe('NumberTickerComponent', () => {
  let component: NumberTickerComponent;
  let fixture: ComponentFixture<NumberTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
