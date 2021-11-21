import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarJourneyMapService {
    API_Key: string = "AgJX_cPiWHeH70dFAqEuqSWg-KWiTVDINccGgu5dBV0Re6Eb7P9cQLkjPBbCzR66";

  constructor(private httpClient: HttpClient) { }

  public getLocationByAddress(start: Array<number>, end: Array<number>, loc: Array<Array<any>>): Observable<any> {
    const retObs = new Observable((observer) => {
      const visitedLocations = this.getLocCoords(loc);
      let wp: number = 1;
      let params = "wp.0=" + start[0] + "," + start[1];
      if ( visitedLocations.length > 0 ) {
        visitedLocations.forEach((location: any) => {
          params += "&wp." + wp +"=" + location.latitude + "," + location.longitude;
          wp++;
        });
      }
      params += "&wp." + wp + "=" + end[0] + "," + end[1];
      
      const url = "https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?" + params + "&mapSize=300,400&key=" + this.API_Key;

      observer.next(url);
    });

    return retObs;
  }

  private getLocCoords(loc: Array<Array<any>>) {
    const visitedLocation: Array<any> = [];
    loc.forEach((loc: Array<any>) => {
      const visit: Array<any> = loc[2];
      const listedPlaces: any = loc[1];

      visit.forEach((place: string) => {
        const val = listedPlaces.find((list: any) => list.entityName === place);

        if ( val !== undefined ) {
          visitedLocation.push(val);
        }
      });
    });

    visitedLocation.sort((a, b) => a.overallDistance - b.overallDistance);

    return visitedLocation;
  }
}