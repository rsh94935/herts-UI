import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlanComponent } from './car-plan.component';

describe('CarPlanComponent', () => {
  let component: CarPlanComponent;
  let fixture: ComponentFixture<CarPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
