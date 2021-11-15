import { Component, Input, OnChanges } from '@angular/core';
import { preferences } from '../models/preferences.enum';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnChanges {
  @Input() stats: any;
  statArray: Array<any> = [];
  prefs = preferences;

  constructor() { }

  ngOnChanges(): void {
    this.mapToArray();
  }

  private mapToArray() {
    this.statArray = [];
    const keys = Object.keys(this.prefs);
    const vals = Object.values(this.prefs);

    for ( let key in this.stats ) {
      const loc = keys.findIndex(val => val === key);
      if ( loc > -1 ) {
        this.statArray.push([vals[loc], this.stats[key].length]);
      } else if ( key === "distance" ) {
        this.statArray.push(["Distance", this.stats[key] + "km"]);
      } else if ( key === "rating" ) {
        this.statArray.push(["Journey Rating", this.stats[key] + "%"]);
      }
    }
  }
}
