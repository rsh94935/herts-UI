import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  //On opening of page, check to see whether there is a code in the query params, if no code, then must be redirected to oauth login
  //Otherwise, if there is a code, then the AWS Lambda that obtains the access token needs to be called, providing the code as a param
  ngOnInit(): void {
    const queryParams = window.location.href.split("?")[1];
    let code = "";

    if ( queryParams !== undefined ) {
      const params = queryParams.split("&");
      params.forEach(param => {
        const paramSplit = param.split("=");

        if ( paramSplit[0] === "code" ) {
          code = paramSplit[1];
        }
      })
    }

    if ( code === "" ) {
      //Open the Oauth login page in existing tab
      window.open("https://navigator-herts.auth.eu-west-2.amazoncognito.com/login?client_id=4lefus9ve2j42qbn1p03g6aavf&response_type=code&scope=email+navigator-server/read+openid&redirect_uri=http://localhost:4200/login", "_self");
    } else {
      //Get access token
      //Get user details and prefs, if none, must be a brand new user, otherwise set returned DB values to ls
      //If new user, go to signup page
      this.router.navigateByUrl('/signup');
      //If existing user, go straight to home page
    }
  }

}
