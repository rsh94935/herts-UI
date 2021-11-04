import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarPlanService {
    API_Key: string = "AgJX_cPiWHeH70dFAqEuqSWg-KWiTVDINccGgu5dBV0Re6Eb7P9cQLkjPBbCzR66";

  constructor(private httpClient: HttpClient) { }

  public getLocationByAddress(loc: any): Observable<any> {
    const retObs = new Observable((observer) => {
      const url = "http://dev.virtualearth.net/REST/v1/Locations/UK/";
      const params = loc.postCode + "?maxResults=1&key=" + this.API_Key + "&addressLine=" + loc.streetAddress + "&locality=" + loc.locality + "&adminDistrict=" + loc.adminDistrict + "&adminDistrict2=" + loc.adminDistrict2;
    
      this.makeRequest(url+params).subscribe(location => {
        observer.next(location);
      });
    });

    return retObs;
  }

  public getRouteList(start: string, end: string, type: string): Observable<any> {
    const retObs = new Observable((observer) => {
        this.getRoutes(start, end, type).subscribe(res => {
          observer.next(res);
        })
    });

    return retObs;
  }

  private getRoutes(start: string, end: string, type: string): Observable<any> {
    const retObs = new Observable((observer) => {
        const url = "http://dev.virtualearth.net/REST/V1/Routes/Driving";
        const params = "?wp.0=" + start + "&wp.1=" + end + "&key=" + this.API_Key + "&maxSolutions=5";

        this.makeRequest(url+params).subscribe(res => {
          res.resourceSets[0].resources.forEach((resource: any) => {
            this.getLocationsOnRoute(resource, type).subscribe(result => {
              console.log(result);
              observer.next();
            })
          })
        });
    });

    return retObs;
  }

  private getLocationsOnRoute(resource: any, type: string): Observable<any> {
    const types: Array<string> = type.split(",");
    const locationCount = resource?.routeLegs[0]?.itineraryItems.length * types.length;
    let locationCounter = 0;
    let retVal: any = {};

    types.forEach((sType: string) => {
      retVal[sType] = [];
    })

    const retObs = new Observable((observer) => {
      let distance = 1;
      resource?.routeLegs[0]?.itineraryItems.forEach((stage: any) => {
        if ( distance < 1 ) {
          distance += stage.travelDistance;
          locationCounter += (types.length + 1);
          console.log(locationCounter)
          console.log(locationCount)
          if ( locationCounter === locationCount ) {
            observer.next(retVal);
          }
        } else {
          const coords: Array<number> = stage?.maneuverPoint?.coordinates;
          const coordsString: string = coords[0] + "," + coords[1];
          types.forEach((sType: string) => {
            this.getLocations(coordsString, sType).subscribe(locationsResult => {
              locationsResult.forEach((location: any) => {
                const findResult = retVal[sType].find((val: any) => val.entityName === location.entityName);
                if ( findResult === undefined ) {
                  retVal[sType].push(location);
                }
              })
              locationCounter++;
              console.log(locationCounter)
              console.log(locationCount)
              if ( locationCounter === locationCount ) {
                observer.next(retVal);
              }
            });
          });
        }
      });
    });

    return retObs;
  }

  private getLocations(coords: string, type: string): Observable<any> {
      const retObs = new Observable((observer) => {
        const url = "http://dev.virtualearth.net/REST/v1/Routes/LocalInsights";
        const params = "?waypoint=" + coords + "&maxTime=10&timeUnit=Minute&type=" + type + "&key=" + this.API_Key;

        this.makeRequest(url+params).subscribe(res => {
          const locations: Array<any> = res.resourceSets[0]?.resources[0]?.categoryTypeResults[0]?.entities;
          observer.next(locations);
        });
      });

      return retObs;
  }

    private makeRequest(url: string): Observable<any> {
      const retObs = new Observable((observer) => {
        this.httpClient.get(url).subscribe(res => {
          let test = JSON.stringify(res);
          let json = JSON.parse(test);
          
          observer.next(json);
        });
      });

      return retObs;
    }
}