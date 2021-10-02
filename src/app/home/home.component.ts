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

  ngOnInit(): void {
    const details = localStorage.getItem("Data");

    if ( details !== undefined && typeof(details) === "string" ) {
      this.userDetails = JSON.parse(details);
    }
  }

  public travelByTrain(): void {
    this.router.navigateByUrl("train-plan");
  }

  public travelByCar(): void {
    this.router.navigateByUrl("car-plan");
  }

  public goToEditUserDetails(): void {
    this.router.navigateByUrl("signup");
  }

  public goToEditPreferences(): void {
    this.router.navigateByUrl("preferences");
  }
}
