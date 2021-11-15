import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() routes: any;
  @Output() selectedRoute: EventEmitter<number> = new EventEmitter<number>();
  expanded: boolean = false;
  routeName: string = "Route 1";

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.expanded = !this.expanded;
  }

  public getHeight(): any {
    const count = this.routes.length;
    let px = "200px";
    
    if ( count < 5 ) {
      px = (count * 41) + "px";
    }

    return {'height': px};
  }

  public selectRoute(index: number): void {
    this.expanded = false;
    this.selectedRoute.emit(index);
  }
}
