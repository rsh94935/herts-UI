import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  //Open login page
  public navigate(): void {
    this.router.navigateByUrl('/login');
  }

}
