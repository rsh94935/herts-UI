import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'navigator-app';
  @HostListener('window:beforeunload')
  confirmLeavingPageBeforeSaving(): void {
    localStorage.removeItem("Data");
    localStorage.removeItem("AWSLogin");
  }
}
