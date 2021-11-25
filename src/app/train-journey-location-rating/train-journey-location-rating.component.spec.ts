import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainJourneyLocationRatingComponent } from './train-journey-location-rating.component';

describe('TrainJourneyLocationRatingComponent', () => {
  let component: TrainJourneyLocationRatingComponent;
  let fixture: ComponentFixture<TrainJourneyLocationRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainJourneyLocationRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainJourneyLocationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
