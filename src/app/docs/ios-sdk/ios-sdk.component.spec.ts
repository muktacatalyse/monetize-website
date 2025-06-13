import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosSDKComponent } from './ios-sdk.component';

describe('IosSDKComponent', () => {
  let component: IosSDKComponent;
  let fixture: ComponentFixture<IosSDKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IosSDKComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IosSDKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
