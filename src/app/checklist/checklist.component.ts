import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnChanges {
  @Input() locations: Array<any> = [];
  @Output() updatedLocations: EventEmitter<any> = new EventEmitter<any>();
  pages: Array<any> = [];
  pageNo: number = 0;
  pageMax: number = 0;
  noOfRows: number = 6;

  constructor() { }

  ngOnChanges(): void {
    this.pageNo = 0;
    this.pageMax = ( this.locations[1].length / this.noOfRows ) - 1;
    this.setupPages();
  }

  private setupPages(): void {
    this.pages = [];
    let start = this.pageNo === 0 ? 0 : this.pageNo * 6;
    let end = ((this.pageNo + 1) * 6);

    if ( end > this.locations[1].length ) {
      end = this.locations[1].length;
    }

    for ( start; start < end; start++ ) {
      const loc = this.locations[1][start];
      console.log(loc)
      if ( loc !== undefined ) {
        this.pages.push(loc);
      } else {
        debugger
      }
    }
  }

  public getClass(index: number): string {
    const b = this.locations[2].indexOf(this.pages[index].entityName);

    return "tickbox " + (b > -1 ? "ticked" : "unticked");
  }

  public selectChoice(index: number): void {
    const b = this.locations[2].indexOf(this.pages[index].entityName);

    b > -1 ? this.locations[2].splice(b, 1) : this.locations[2].push(this.pages[index].entityName);

    this.updatedLocations.emit(this.locations);
  }

  public selectPage(pageNo: number): void {
    this.pageNo = pageNo;
    this.setupPages();
  }
}
