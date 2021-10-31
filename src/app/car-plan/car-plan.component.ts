import { Component, OnInit } from '@angular/core';
import { Location } from '../classes/location';

@Component({
  selector: 'car-plan',
  templateUrl: './car-plan.component.html',
  styleUrls: ['./car-plan.component.scss']
})
export class CarPlanComponent implements OnInit {
  oExpanded: Array<boolean> = [false, false];
  location: string = 'current';
  coords: Array<number> = [0, 0];
  current = new Location("","","","","");
  end = new Location("","","","","");

  constructor() { }

  ngOnInit(): void {
  }

  //WIP page

  public toggle(section: number): void {
    this.oExpanded[1-section] = false;
    this.oExpanded[section] = !this.oExpanded[section];
  }

  public handleChange(event: string): void {
    this.location = event;

    if ( event === "current" ) {
      navigator.geolocation.getCurrentPosition((loc) => {
        this.coords = [loc?.coords?.latitude, loc?.coords?.longitude];
      });
    }
  }

  public checkCustom(): boolean {
    console.log(this.location)
    return this.location === "custom";
  }

  public onCustomSubmit(): void {}
}
