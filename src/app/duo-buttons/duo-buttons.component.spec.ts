import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuoButtonsComponent } from './duo-buttons.component';

describe('DuoButtonsComponent', () => {
  let component: DuoButtonsComponent;
  let fixture: ComponentFixture<DuoButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuoButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
