import { Component, OnInit } from '@angular/core';
import { startLocation } from '../classes/startLocation';

@Component({
  selector: 'train-plan',
  templateUrl: './train-plan.component.html',
  styleUrls: ['./train-plan.component.scss']
})
export class TrainPlanComponent implements OnInit {
  oExpanded: Array<boolean> = [false, false];
  current = new startLocation("",new Date(),"");

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(section: number): void {
    this.oExpanded[1-section] = false;
    this.oExpanded[section] = !this.oExpanded[section];
  }

  public onCustomSubmit(): void { }
}
