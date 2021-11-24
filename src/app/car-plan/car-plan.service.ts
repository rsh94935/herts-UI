import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarPlanService {
  API_Key: string = "AgJX_cPiWHeH70dFAqEuqSWg-KWiTVDINccGgu5dBV0Re6Eb7P9cQLkjPBbCzR66";
  visited: Array<any> = [];

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
    const types: Array<string> = type.split(",");
    const retObs = new Observable((observer) => {
        this.getRoutes(start, end, types).subscribe(res => {
          observer.next(this.calculateBestRoutes(res, types));
        })
    });

    return retObs;
  }

  private getPreviouslyVisited(): void {
    const stored = localStorage.getItem("StoredLocations");
    if ( stored !== undefined && typeof(stored) === "string" ) {
      this.visited = JSON.parse(stored);
    }
  }

  private getRoutes(start: string, end: string, types: Array<string>): Observable<any> {
    const retObs = new Observable((observer) => {
        const url = "http://dev.virtualearth.net/REST/V1/Routes/Driving";
        const params = "?wp.0=" + start + "&wp.1=" + end + "&key=" + this.API_Key + "&maxSolutions=5";
        let routeCounter: number = 0;
        let routeArray: Array<any> = [];

        this.makeRequest(url+params).subscribe(res => {
          const routeCount = res.resourceSets[0].resources.length;
          res.resourceSets[0].resources.forEach((resource: any) => {
            this.getLocationsOnRoute(resource, types).subscribe(result => {
              routeCounter++;
              routeArray.push(result);
              if ( routeCounter === routeCount ) {
                observer.next(routeArray);
              }
            })
          })
        });
    });

    return retObs;
  }

  private getLocationsOnRoute(resource: any, types: Array<string>): Observable<any> {
    const locationCount = ( resource?.routeLegs[0]?.itineraryItems.length * types.length );
    let locationCounter: number = 0;
    let overallDistance: number = 0;
    let retVal: any = {};
    retVal['start'] = [resource.bbox[0], resource.bbox[1]];
    retVal['end'] = [resource.bbox[2], resource.bbox[3]];
    retVal['distance'] = resource.travelDistance;

    types.forEach((sType: string) => {
      retVal[sType] = [];
    })

    const retObs = new Observable((observer) => {
      let distance: number = 0;
      resource?.routeLegs[0]?.itineraryItems.forEach((stage: any) => {
        setTimeout(() => {
          distance += stage.travelDistance;
          if ( distance < 1 ) {
            overallDistance += distance;
            locationCounter += types.length;
            if ( locationCounter === locationCount ) {
              observer.next(retVal);
            }
          } else {
            overallDistance += distance;
            const routeDistance: number = Math.round(overallDistance * 100) / 100;
            distance = 0;
            const coords: Array<number> = stage?.maneuverPoint?.coordinates;
            const coordsString: string = coords[0] + "," + coords[1];
            types.forEach((sType: string) => {
              this.getLocations(coordsString, sType).subscribe(locationsResult => {
                locationsResult.forEach((location: any) => {
                  location['overallDistance'] = routeDistance;
                  const findResult = retVal[sType].find((val: any) => val.entityName === location.entityName);
                  if ( findResult === undefined ) {
                    const visitedLocation = this.visited.find((visit: any) => visit.name === location.entityName);
                    if ( visitedLocation === undefined ) {
                      retVal[sType].push(location);
                    } else {
                      if ( visitedLocation.visitAgain !== "never" ) {
                        retVal[sType].push(location);
                      }
                    }
                  }
                })
                locationCounter++;
                if ( locationCounter === locationCount ) {
                  observer.next(retVal);
                }
              });
            });
          }
        }, 500);
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

    private calculateBestRoutes(routes: any, types: Array<string>): Array<any> {
      const obj: any = {};

      //Go through each type and find the highest amount of variations for each attraction across all the routes
      types.forEach((type: string) => {
        let count = 0;
        routes.forEach((route: any) => {
          count = route[type].length > count ? route[type].length : count;
        });
        obj[type] = count;
      });

      routes.forEach((route: any) => {
        let rating: number = 0;

        Object.keys(obj).forEach((type: string) => {
          rating += ((route[type].length / obj[type]) * 100) / types.length;
        });

        route["rating"] = Math.round(rating * 100) / 100
      });

      return routes;
    }
}