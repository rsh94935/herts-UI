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
  detailsForm = this.formBuilder.group({
    fname: '',
    lname: '',
    address1: '',
    address2: '',
    city: '',
    postcode: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const details = localStorage.getItem("Data");

    if ( details !== undefined && typeof(details) === "string" ) {
      this.detailsForm.setValue(JSON.parse(details));
      this.title = "Edit user details";
    }
  }

  public onSubmit(): void {
    localStorage.setItem('Data', JSON.stringify(this.detailsForm.value));
    this.router.navigateByUrl(this.title === "Signup" ? '/preferences' : '/home');
  }
}
