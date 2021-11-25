import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainOptionsComponent } from './train-options.component';

describe('TrainOptionsComponent', () => {
  let component: TrainOptionsComponent;
  let fixture: ComponentFixture<TrainOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
