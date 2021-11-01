import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  startCoords: Array<number> = [0, 0];
  endCoords: Array<number> = [0, 0];
  current = new Location("","","","","");
  end = new Location("","","","","");

  constructor(private httpClient: HttpClient) { }

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
        this.startCoords = [loc?.coords?.latitude, loc?.coords?.longitude];
      });
    } else {
    }
  }

  public checkCustom(): boolean {
    return this.location === "custom";
  }

  public onCustomSubmit(): void {
    let header = {
      //headers: new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(this.AWS).AccessToken)
    }
    let params = {
      streetAddress: this.current.streetAddress,
      locality: this.current.locality,
      adminDistrict: this.current.adminDistrict,
      adminDistrict2: this.current.adminDistrict2,
      postCode: this.current.postCode
    }
    this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/getLocation", params, header).subscribe(res => {
      let test = JSON.stringify(res);
      let json = JSON.parse(test);
      let coords = json?.message?.resourceSets[0]?.resources[0]?.point?.coordinates;
      this.startCoords = [coords[0], coords[1]];
    });
  }

  public onEndSubmit(): void {
    let header = {
      //headers: new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(this.AWS).AccessToken)
    }
    let params = {
      streetAddress: this.end.streetAddress,
      locality: this.end.locality,
      adminDistrict: this.end.adminDistrict,
      adminDistrict2: this.end.adminDistrict2,
      postCode: this.end.postCode
    }
    this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/getLocation", params, header).subscribe(res => {
      let test = JSON.stringify(res);
      let json = JSON.parse(test);
      let coords = json?.message?.resourceSets[0]?.resources[0]?.point?.coordinates;
      this.endCoords = [coords[0], coords[1]];
    });
  }
}
