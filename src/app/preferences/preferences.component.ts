import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  title: string = "Select your favourite activities";
  //Choices array also populates the HTML page, to add any future preferences, just need to add to the array
  choices: Array<string> = ["Historical Landmarks", "Restaurants", "Shopping Centers", "Supermarkets", "Activities", "Walking Routes"];
  chosen: Array<string> = [];

  constructor(private router: Router) { }

  //Need to check that the Preferences are in the local storage already, if they are then setup the chosen array with the contents of the localstorage
  ngOnInit(): void {
    const prefs = localStorage.getItem("Prefs");

    if ( prefs !== undefined && typeof(prefs) === "string" ) {
      this.chosen = JSON.parse(prefs).choices;
      this.title = "Edit your favourite activities";
    }
  }

  //Function to setup the html element's class based on whether the item is located in the chosen array
  public getClass(sChoice: string): string {
    return "choice " + (this.chosen.find(sChosen => sChosen === sChoice) ? "selected" : "unselected");
  }

  //Function to add or remove the choice from the chosen array (Based on whether the item is or isn't in the chosen array as of yet)
  public selectChoice(sChoice: string): void {
    const selected: boolean = this.chosen.find(sChosen => sChosen === sChoice) !== undefined;

    selected ? this.chosen = this.chosen.filter(sChosen => sChosen !== sChoice) : this.chosen.push(sChoice);
  }

  //Do a check to see whether any item has been selected, at which point the user can continue, and save their choices to their profile
  public canContinue(): string {
    return this.chosen.length >= 1 ? "button active-button" : "button disabled-button";
  }

  //If users do not yet wish to save their preferences, they can skip to the home page
  public skip(): void {
    this.router.navigateByUrl("/home");
  }

  //Save the user preferences to both the dynamoDB, and keep a copy in the local storage so that the user does not ramp up AWS usage costs
  public continue(): void {
    localStorage.setItem('Prefs', JSON.stringify({choices: this.chosen}));
    this.router.navigateByUrl("/home");
  }
}
