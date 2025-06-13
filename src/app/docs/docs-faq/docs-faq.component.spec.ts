import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsFAQComponent } from './docs-faq.component';

describe('DocsFAQComponent', () => {
  let component: DocsFAQComponent;
  let fixture: ComponentFixture<DocsFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
