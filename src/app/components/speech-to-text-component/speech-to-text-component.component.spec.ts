import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextComponentComponent } from './speech-to-text-component.component';

describe('SpeechToTextComponentComponent', () => {
  let component: SpeechToTextComponentComponent;
  let fixture: ComponentFixture<SpeechToTextComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechToTextComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToTextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
