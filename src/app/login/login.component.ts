import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }

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
      window.open("https://navigator-herts.auth.eu-west-2.amazoncognito.com/login?client_id=4lefus9ve2j42qbn1p03g6aavf&response_type=code&scope=email+navigator-server/read+openid+aws.cognito.signin.user.admin&redirect_uri=http://localhost:4200/login", "_self");
    } else {
      //Get access token
      let atParams = {
        code: code
      }
      
      this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/getAccessToken", atParams).subscribe(res => {
        const accessTokenResponse: any = res;
        //Convert response to an usable object, this now has the access token, now we want to get the username from the returned object
        let userHeader = {
          headers: new HttpHeaders().set("X-Amz-Target", "AWSCognitoIdentityProviderService.GetUser").set("Content-Type", "application/x-amz-json-1.1")
        }
        let body = {
          AccessToken: accessTokenResponse["message"]["access_token"]
        }
        this.httpClient.post("https://cognito-idp.eu-west-2.amazonaws.com/", body, userHeader).subscribe(res => {
          const userDetailsResponse: any = res;
          localStorage.setItem('AWSLogin', JSON.stringify({
            AccessToken: accessTokenResponse["message"]["access_token"],
            Username: userDetailsResponse["Username"]
          }));
          //Now we have the user object, we can obtain the Username, time to get the user data to check that the user exists
          let params = {
            username: userDetailsResponse["Username"]
          }
          let header = {
            headers: new HttpHeaders().set("Authorization", "Bearer " + accessTokenResponse["message"]["access_token"])
          }
          this.httpClient.post("https://a1fivkgat7.execute-api.eu-west-2.amazonaws.com/dev/getUserData", params, header).subscribe(res => {
            const userDetails: any = res;
            //Check to see whether a required field exists in the database, if not, has to be a new user
            if ( userDetails["message"]["fname"] === "" || userDetails["message"]["fname"] === undefined ) {
              this.router.navigateByUrl('/signup');
            } else if ( userDetails["message"]["preferences"][0] === "[]" || userDetails["message"]["preferences"] === undefined ) {
              let obj: any = {};

              for ( let key in userDetails["message"] ) {
                if ( key !== "username" ) {
                  obj[key] = userDetails["message"][key].toString().replace(/\"/g,'');
                }
              }
              localStorage.setItem("Data", JSON.stringify(obj));
              //User details set, but no preferences
              this.router.navigateByUrl('/preferences');
            } else {
              let obj: any = {};

              for ( let key in userDetails["message"] ) {
                if ( key === "preferences" ) {
                  obj[key] = JSON.parse(userDetails["message"][key][0]);
                } else if ( key !== "username" ) {
                  obj[key] = userDetails["message"][key].replace(/\"/g,'');
                }
              }
              localStorage.setItem("Data", JSON.stringify(obj));
              //Both user details and preferences set, go straight to home
              this.router.navigateByUrl('/home');
            }
          });
        });
      });
    }
  }

}
