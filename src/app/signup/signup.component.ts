import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title: string = "Signup";
  AWS: any;
  preferences = [];
  //Setup initial form object, initially set as all blank
  detailsForm = this.formBuilder.group({
    fname: '',
    lname: '',
    add1: '',
    add2: '',
    city: '',
    postcode: ''
  });
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor(private formBuilder: FormBuilder, private router: Router, private httpClient: HttpClient) { }

  //On initial run of the page, obtain from local storage the user details to auto populate the form, if no local storage, all details will continue as blank
  ngOnInit(): void {
    const details = localStorage.getItem("Data");
    this.AWS = localStorage.getItem('AWSLogin');

    if ( details !== undefined && typeof(details) === "string" ) {
      const json = JSON.parse(details);
      const userDets = {
        fname: json.fname,
        lname: json.lname,
        add1: json.add1,
        add2: json.add2,
        city: json.city,
        postcode: json.postcode
      }
      this.detailsForm.setValue(userDets);
      //If there were existing details in the local storage, alter the title of the page to read Edit user details
      this.title = "Edit user details";
    }
  }

  //Submit the form data to both dynamoDB and the local storage (LS to prevent constant calls to the DB, easier to retain the data in ls)
  public onSubmit(): void {
    const form = this.detailsForm.value;
    form["preferences"] = this.preferences
    localStorage.setItem('Data', JSON.stringify(form));
    let header = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(this.AWS).AccessToken)
    }
    let params = {
      username: JSON.parse(this.AWS).Username,
      fname: form.fname,
      lname: form.lname,
      add1: form.add1,
      add2: form.add2,
      city: form.city,
      postcode: form.postcode,
      preferences: this.preferences
    }
    this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/setUserData", params, header).subscribe(res => {
      //If new user, go to signup page
      this.router.navigateByUrl('/preferences');
    });
  }

  //Function to click the hidden form button
  public submitForm() {
    const elem: HTMLElement = this.submitButton.nativeElement;
    if ( elem !== undefined ) {
      elem.click();
    }
  }
}
