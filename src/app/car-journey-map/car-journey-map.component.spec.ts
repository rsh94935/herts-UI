import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarJourneyMapComponent } from './car-journey-map.component';

describe('CarJourneyMapComponent', () => {
  let component: CarJourneyMapComponent;
  let fixture: ComponentFixture<CarJourneyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarJourneyMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarJourneyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
