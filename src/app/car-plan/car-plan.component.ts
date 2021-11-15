import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../classes/location';
import { preferences } from '../models/preferences.enum';
import { CarPlanService } from './car-plan.service';

@Component({
  selector: 'car-plan',
  templateUrl: './car-plan.component.html',
  styleUrls: ['./car-plan.component.scss']
})
export class CarPlanComponent implements OnInit {
  oExpanded: Array<boolean> = [false, false];
  location: string = 'current';
  startCoords: Array<number> = [0, 0];
  endCoords: Array<number> = [0, 0];
  current = new Location("","","","","");
  end = new Location("","","","","");
  prefs = preferences;
  prefsString: string = "";

  constructor(private router: Router, private cps: CarPlanService) { }

  ngOnInit(): void {
    const prefs = localStorage.getItem("Data");
    if ( prefs !== undefined && typeof(prefs) === "string" ) {
      const json = JSON.parse(prefs);
      const keys = Object.keys(this.prefs);
      const vals = Object.values(this.prefs);
      json.preferences.forEach((pref: string) => {
        const loc = vals.findIndex(val => val === pref);
        if ( loc > -1 ) {
          this.prefsString += this.prefsString === "" ? keys[loc] : "," + keys[loc];
        }
      });
    }
    this.handleChange("current");
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
        this.startCoords = [loc?.coords?.latitude, loc?.coords?.longitude];
      });
    } else {
    }
  }

  public checkCustom(): boolean {
    return this.location === "custom";
  }

  public onCustomSubmit(): void {
    this.cps.getLocationByAddress(this.current).subscribe(res => {
      let coords = res?.resourceSets[0]?.resources[0]?.point?.coordinates;
      this.startCoords = [coords[0], coords[1]];
    });
  }

  public onEndSubmit(): void {
    this.cps.getLocationByAddress(this.end).subscribe(res => {
      let coords = res?.resourceSets[0]?.resources[0]?.point?.coordinates;
      this.endCoords = [coords[0], coords[1]];
    });
  }

  public checkCoordsSet(): string {
    if ( this.startCoords[0] !== 0 && this.startCoords[1] !== 0 && this.endCoords[0] !== 0 && this.endCoords[1] !== 0 ) {
      return "button active-button";
    }

    return "button disabled-button";
  }

  public backToHome(): void {
    this.router.navigateByUrl("/home");
  }

  public continue(): void {
    const start: string = this.startCoords[0] + "," + this.startCoords[1];
    const end: string = this.endCoords[0] + "," + this.endCoords[1];
    this.cps.getRouteList(start, end, this.prefsString).subscribe(res => {
      localStorage.setItem('Routes', JSON.stringify(res));
      this.router.navigateByUrl("/car-options");
    });
  }
}
