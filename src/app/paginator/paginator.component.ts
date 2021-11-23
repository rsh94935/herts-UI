import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() pageMax: number = 0;
  @Output() emitPage: EventEmitter<number> = new EventEmitter<number>();
  pageNo = 0;

  constructor() { }

  ngOnChanges(): void {
  }

  public first(): void {
    this.pageNo = 0;
    this.emitPage.emit(this.pageNo);
  }

  public back(): void {
    this.pageNo === 0 ? this.pageNo = 0 : this.pageNo--;
    this.emitPage.emit(this.pageNo);
  }

  public next(): void {
    this.pageNo === this.pageMax? this.pageNo = this.pageMax : this.pageNo++;
    this.emitPage.emit(this.pageNo);
  }

  public last(): void {
    this.pageNo = this.pageMax;
    this.emitPage.emit(this.pageNo);
  }
}
