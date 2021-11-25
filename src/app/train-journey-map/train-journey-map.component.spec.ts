import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainJourneyMapComponent } from './train-journey-map.component';

describe('TrainJourneyMapComponent', () => {
  let component: TrainJourneyMapComponent;
  let fixture: ComponentFixture<TrainJourneyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainJourneyMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainJourneyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
