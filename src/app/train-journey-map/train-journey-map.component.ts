import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainJourneyMapService } from './train-journey-map.service';

@Component({
  selector: 'app-train-journey-map',
  templateUrl: './train-journey-map.component.html',
  styleUrls: ['./train-journey-map.component.scss']
})
export class TrainJourneyMapComponent implements OnInit {
  url: string = "";

  constructor(private tjms: TrainJourneyMapService, private router: Router) { }

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
    
    this.tjms.getLocationByAddress(parseRoute.start, parseRoute.end, parseLocs).subscribe(res => {
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
