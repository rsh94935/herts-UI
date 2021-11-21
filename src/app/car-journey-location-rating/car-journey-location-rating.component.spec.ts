import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarJourneyLocationRatingComponent } from './car-journey-location-rating.component';

describe('CarJourneyLocationRatingComponent', () => {
  let component: CarJourneyLocationRatingComponent;
  let fixture: ComponentFixture<CarJourneyLocationRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarJourneyLocationRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarJourneyLocationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
