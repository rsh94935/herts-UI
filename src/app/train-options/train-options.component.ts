import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-options',
  templateUrl: './train-options.component.html',
  styleUrls: ['./train-options.component.scss']
})
export class TrainOptionsComponent implements OnInit {
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
    this.router.navigateByUrl("/train-select-locations");
  }

  public selectRoute(val: number) {
    this.route = this.routes[val];
  }
}
