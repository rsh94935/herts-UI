import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

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
      window.open("https://navigator-herts.auth.eu-west-2.amazoncognito.com/login?client_id=4lefus9ve2j42qbn1p03g6aavf&response_type=code&scope=email+navigator-server/read+openid&redirect_uri=http://localhost:4200/login", "_self");
    } else {
      this.router.navigateByUrl('/signup');
    }
  }

}
