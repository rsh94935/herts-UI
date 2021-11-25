import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endLocation } from '../classes/endLocation';
import { startLocation } from '../classes/startLocation';
import { preferences } from '../models/preferences.enum';
import { TrainPlanService } from './train-plan.service';

@Component({
  selector: 'train-plan',
  templateUrl: './train-plan.component.html',
  styleUrls: ['./train-plan.component.scss']
})
export class TrainPlanComponent implements OnInit {
  oExpanded: Array<boolean> = [false, false];
  current = new startLocation("","");
  end = new endLocation("");
  prefs = preferences;
  prefsString: string = "";

  constructor(private tps: TrainPlanService, private router: Router) { }

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
  }

  public toggle(section: number): void {
    this.oExpanded[1-section] = false;
    this.oExpanded[section] = !this.oExpanded[section];
  }

  public checkCoordsSet(): boolean {
    if ( this.current.city !== "" && this.end.city !== "" ) {
      return true;
    }

    return false;
  }

  public backToHome(): void {
    this.router.navigateByUrl("/home");
  }

  public continue(): void {
    this.tps.getRouteList(this.current, this.end.city, this.prefsString).subscribe(res => {
      localStorage.setItem('Routes', JSON.stringify(res));
      this.router.navigateByUrl("/train-options");
    });
  }
}
