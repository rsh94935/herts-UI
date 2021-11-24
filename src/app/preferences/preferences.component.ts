import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { preferences } from '../models/preferences.enum';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  AWS: any;
  data: any = {};
  title: string = "Select your favourite activities";
  //Choices array also populates the HTML page, to add any future preferences, just need to add to the array
  choices: Array<string> = [];
  chosen: Array<string> = [];
  preferences = preferences;


  constructor(private router: Router, private httpClient: HttpClient) { }

  //Need to check that the Preferences are in the local storage already, if they are then setup the chosen array with the contents of the localstorage
  ngOnInit(): void {
    this.choices = Object.values(this.preferences);
    const prefs = localStorage.getItem("Data");
    this.AWS = localStorage.getItem('AWSLogin');

    if ( prefs !== undefined && typeof(prefs) === "string" ) {
      const prefData = JSON.parse(prefs);
      if ( !!prefData.preferences ) {
        this.chosen = typeof(prefData.preferences) === "object" ? prefData.preferences : JSON.parse(prefData.preferences);
        this.title = "Edit your favourite activities";
      }
  
      for ( let key in prefData ) {
        if ( key !== "preferences" ) {
          this.data[key] = prefData[key];
        }
      }
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
  public canContinue(): boolean {
    return this.chosen.length >= 1 ? true : false;
  }

  //If users do not yet wish to save their preferences, they can skip to the home page
  public skip(): void {
    this.router.navigateByUrl("/home");
  }

  //Save the user preferences to both the dynamoDB, and keep a copy in the local storage so that the user does not ramp up AWS usage costs
  public continue(): void {
    let params: any = {
      username: JSON.parse(this.AWS).Username,
      preferences: this.chosen
    }
    let prefData: any = {
      preferences: this.chosen
    }
    let header = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(this.AWS).AccessToken)
    }

    for ( let key in this.data ) {
      prefData[key] = this.data[key];
      params[key] = this.data[key];
    }
    this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/setUserData", params, header).subscribe(res => {
      //If new user, go to signup page
      localStorage.setItem('Data', JSON.stringify(prefData));
      this.router.navigateByUrl("/home");
    });
  }
}
