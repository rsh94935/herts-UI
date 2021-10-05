import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userDetails } from '../models/userDetails';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails = {fname: "", lname: "", address1: "", address2: "", city: "", postcode: ""};

  constructor(private router: Router) { }

  //Load user details (required for welcoming text)
  ngOnInit(): void {
    const details = localStorage.getItem("Data");

    if ( details !== undefined && typeof(details) === "string" ) {
      this.userDetails = JSON.parse(details);
    }
  }

  //Open train travel page
  public travelByTrain(): void {
    this.router.navigateByUrl("train-plan");
  }

  //Open car travel page
  public travelByCar(): void {
    this.router.navigateByUrl("car-plan");
  }

  //Open user details page
  public goToEditUserDetails(): void {
    this.router.navigateByUrl("signup");
  }

  //Open user preferences page
  public goToEditPreferences(): void {
    this.router.navigateByUrl("preferences");
  }

  //Logout of session
  public logout(): void {
    localStorage.removeItem("Data");
    localStorage.removeItem("AWSLogin");
    this.router.navigateByUrl("splash");
  }
}
