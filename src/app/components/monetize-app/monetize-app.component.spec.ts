import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetizeAppComponent } from './monetize-app.component';

describe('MonetizeAppComponent', () => {
  let component: MonetizeAppComponent;
  let fixture: ComponentFixture<MonetizeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetizeAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetizeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
