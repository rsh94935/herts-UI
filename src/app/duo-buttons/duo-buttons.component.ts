import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duo-buttons',
  templateUrl: './duo-buttons.component.html',
  styleUrls: ['./duo-buttons.component.scss']
})
export class DuoButtonsComponent implements OnInit {
  @Input() greenText: string = "";
  @Input() redText: string = "";
  @Input() greyed: boolean = false;
  @Output() green: EventEmitter<void> = new EventEmitter<void>();
  @Output() red: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  public next(): void {
    if ( this.greyed ) {
      this.green.emit();
    }
  }

  public back(): void {
    this.red.emit();
  }
}
