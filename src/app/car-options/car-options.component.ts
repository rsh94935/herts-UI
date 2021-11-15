import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-options',
  templateUrl: './car-options.component.html',
  styleUrls: ['./car-options.component.scss']
})
export class CarOptionsComponent implements OnInit {
  routes: Array<any> = [];
  route: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const routes = localStorage.getItem("Routes");
    if ( routes !== undefined && typeof(routes) === "string" ) {
      const json = JSON.parse(routes);
      this.routes = json;
      this.route = json[0];
    }
  }

  public backToHome(): void {
    this.router.navigateByUrl("/home");
  }

  public continue(): void {
    localStorage.setItem('Route', JSON.stringify(this.route));
    this.router.navigateByUrl("/car-select-locations");
  }

  public selectRoute(val: number) {
    this.route = this.routes[val];
  }
}
