import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { preferences } from '../models/preferences.enum';

@Component({
  selector: 'app-train-select-locations',
  templateUrl: './train-select-locations.component.html',
  styleUrls: ['./train-select-locations.component.scss']
})
export class TrainSelectLocationsComponent implements OnInit {
  route: any;
  locArray: Array<any> = [];
  locPage: Array<any> = [];
  prefs = preferences;
  backButtonText: string = "Back to Home";
  nextButtonText: string = "Continue";
  pageNo: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const routes = localStorage.getItem("Route");
    if ( routes !== undefined && typeof(routes) === "string" ) {
      const json = JSON.parse(routes);
      this.route = json;
    }

    this.mapToArray();
    this.setupPage();
  }

  private mapToArray() {
    this.locArray = [];
    const keys = Object.keys(this.prefs);
    const vals = Object.values(this.prefs);

    for ( let key in this.route ) {
      const loc = keys.findIndex(val => val === key);
      if ( loc > -1 ) {
        if ( this.route[key].length > 0 ) {
          this.locArray.push([vals[loc], this.route[key], []]);
        }
      }
    }
  }

  private setupPage(): void {
    this.locPage = this.locArray[this.pageNo];
    this.backButtonText = this.pageNo === 0 ? "Back to Home" : this.locArray[this.pageNo-1][0];
    this.nextButtonText = this.pageNo === this.locArray.length - 1 ? "Continue" : this.locArray[this.pageNo+1][0];
  }

  public updateLocations(locations: Array<any>): void {
    this.locPage = locations;
  }

  public back(): void {
    if ( this.pageNo === 0 ) {
      this.router.navigateByUrl("/home");
    } else {
      this.pageNo--;
      this.setupPage();
    }
  }

  public continue(): void {
    if ( this.pageNo === this.locArray.length - 1 ) {
      localStorage.setItem('VisitedLocations', JSON.stringify(this.locArray));
      this.router.navigateByUrl("/train-journey-map");
    } else {
      this.locArray[this.pageNo] = this.locPage;
      this.pageNo++;
      this.setupPage();
    }
  }
}
