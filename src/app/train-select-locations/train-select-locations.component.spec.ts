import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSelectLocationsComponent } from './train-select-locations.component';

describe('TrainSelectLocationsComponent', () => {
  let component: TrainSelectLocationsComponent;
  let fixture: ComponentFixture<TrainSelectLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainSelectLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSelectLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
