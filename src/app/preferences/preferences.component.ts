import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  choices: Array<string> = ["Historical Landmarks", "Restaurants", "Shopping Centers", "Supermarkets", "Activities", "Walking Routes"];
  chosen: Array<string> = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getClass(sChoice: string): string {
    return "choice " + (this.chosen.find(sChosen => sChosen === sChoice) ? "selected" : "unselected");
  }

  public selectChoice(sChoice: string): void {
    const selected: boolean = this.chosen.find(sChosen => sChosen === sChoice) !== undefined;

    selected ? this.chosen = this.chosen.filter(sChosen => sChosen !== sChoice) : this.chosen.push(sChoice);
  }

  public canContinue(): string {
    return this.chosen.length >= 1 ? "button active-button" : "button disabled-button";
  }

  public skip(): void {
    this.router.navigateByUrl("/home");
  }

  public continue(): void {
    this.router.navigateByUrl("/home");
  }
}
