import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelectLocationsComponent } from './car-select-locations.component';

describe('CarSelectLocationsComponent', () => {
  let component: CarSelectLocationsComponent;
  let fixture: ComponentFixture<CarSelectLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSelectLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSelectLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
