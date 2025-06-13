import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidSDKComponent } from './android-sdk.component';

describe('AndroidSDKComponent', () => {
  let component: AndroidSDKComponent;
  let fixture: ComponentFixture<AndroidSDKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AndroidSDKComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndroidSDKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
