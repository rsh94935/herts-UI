import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarJourneyMapService } from './car-journey-map.service';

@Component({
  selector: 'app-car-journey-map',
  templateUrl: './car-journey-map.component.html',
  styleUrls: ['./car-journey-map.component.scss']
})
export class CarJourneyMapComponent implements OnInit {
  url: string = "";

  constructor(private cjms: CarJourneyMapService, private router: Router) { }

  ngOnInit(): void {
    const locs = localStorage.getItem("VisitedLocations");
    let parseLocs: Array<Array<any>> = [];
    if ( locs !== undefined && typeof(locs) === "string" ) {
      parseLocs = JSON.parse(locs);
    }
    const route = localStorage.getItem("Route");
    let parseRoute = {start: [], end: []}
    if ( route !== undefined && typeof(route) === "string" ) {
      parseRoute = JSON.parse(route);
    }
    
    this.cjms.getLocationByAddress(parseRoute.start, parseRoute.end, parseLocs).subscribe(res => {
      console.log(res)
      this.url = res;
    });
  }

  public back(): void {
    this.router.navigateByUrl("/home");
  }

  public continue(): void {
    this.router.navigateByUrl("/car-journey-location-rating");
  }
}
