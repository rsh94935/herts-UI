import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-journey-location-rating',
  templateUrl: './car-journey-location-rating.component.html',
  styleUrls: ['./car-journey-location-rating.component.scss']
})
export class CarJourneyLocationRatingComponent implements OnInit {
  attractions: Array<any> = [];
  visited: Array<any> = [];
  pageNo: number = 0;
  pageMin: number = 0;
  pageMax: number = 0;
  attractionPages: Array<any> = [];
  noOfRows: number = 6;
  AWS: any;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.AWS = localStorage.getItem('AWSLogin');
    this.setVisitedLocationsFromStorage();
    this.setAttractionsFromStorage();
  }

  private setAttractionsFromStorage() {
    const locs = localStorage.getItem("VisitedLocations");
    let parseLocs: Array<Array<any>> = [];
    if ( locs !== undefined && typeof(locs) === "string" ) {
      parseLocs = JSON.parse(locs);
      parseLocs.forEach((loc: Array<any>) => {
        const attractionNames: Array<string> = loc[2];

        attractionNames.forEach((attraction: string) => {
          const place = this.visited.find((visit: any) => visit.name === attraction);
          let visitAgain: string = "neutral";

          if ( place !== undefined ) {
            if ( place.visitAgain === "again" ) {
              visitAgain = "again";
            }
          }
          this.attractions.push({
            name: attraction,
            visitAgain: visitAgain,
            attractionType: loc[0]
          })
        });
      });

      this.pageMax = Math.max(0, Math.round(( this.attractions.length / this.noOfRows )));
      this.setupPages();
    }
  }

  private setVisitedLocationsFromStorage(): void {
    const stored = localStorage.getItem("StoredLocations");
    if ( stored !== undefined && typeof(stored) === "string" ) {
      const json = JSON.parse(stored);
      if ( typeof(json) === "string" ) {
        this.visited = JSON.parse(json);
      } else {
        this.visited = json;        
      }
    }
  }

  public setupPages(): void {
    this.attractionPages = [];
    let start = this.pageNo === 0 ? 0 : this.pageNo * this.noOfRows;
    let end = ((this.pageNo + 1) * this.noOfRows);

    if ( end > this.attractions.length ) {
      end = this.attractions.length;
    }

    for ( start; start < end; start++ ) {
      const attraction = this.attractions[start];
      if ( attraction !== undefined ) {
        this.attractionPages.push(attraction);
      } else {
        console.error("Unknown attraction")
      }
    }
  }

  public getClass(index: number, value: string): string {
    const b: any = this.attractions.find((attraction: any) => attraction.name === this.attractionPages[index].name);

    return "tickbox " + (b.visitAgain === value ? "ticked" : "unticked");
  }

  public selectChoice(index: number, value: string): void {
    const b: number = this.attractions.findIndex((attraction: any) => attraction.name === this.attractionPages[index].name);
    
    this.attractionPages[index].visitAgain = value;
    this.attractions[b].visitAgain = value;
  }

  public selectPage(pageNo: number): void {
    this.pageNo = pageNo;
    this.setupPages();
  }

  public confirm() {
    this.attractions.forEach(attraction => {
      const index: number = this.visited.findIndex((visit: any) => visit.name === attraction.name);

      if ( index > -1 ) {
        this.visited[index] = attraction;
      } else {
        this.visited.push(attraction);
      }
    });
    let header = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(this.AWS).AccessToken)
    }
    let params = {
      username: JSON.parse(this.AWS).Username,
      visited: this.visited
    }
    this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/setUserVisited", params, header).subscribe(res => {
      //If new user, go to signup page
      localStorage.setItem("StoredLocations", JSON.stringify(this.visited));
      this.router.navigateByUrl('/home');
    });
  }
}
