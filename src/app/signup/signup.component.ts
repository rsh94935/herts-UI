import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title: string = "Signup";
  //Setup initial form object, initially set as all blank
  detailsForm = this.formBuilder.group({
    fname: '',
    lname: '',
    address1: '',
    address2: '',
    city: '',
    postcode: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  //On initial run of the page, obtain from local storage the user details to auto populate the form, if no local storage, all details will continue as blank
  ngOnInit(): void {
    const details = localStorage.getItem("Data");

    if ( details !== undefined && typeof(details) === "string" ) {
      this.detailsForm.setValue(JSON.parse(details));
      //If there were existing details in the local storage, alter the title of the page to read Edit user details
      this.title = "Edit user details";
    }
  }

  //Submit the form data to both dynamoDB and the local storage (LS to prevent constant calls to the DB, easier to retain the data in ls)
  public onSubmit(): void {
    localStorage.setItem('Data', JSON.stringify(this.detailsForm.value));
    this.router.navigateByUrl(this.title === "Signup" ? '/preferences' : '/home');
  }
}
