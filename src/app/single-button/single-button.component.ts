import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-button',
  templateUrl: './single-button.component.html',
  styleUrls: ['./single-button.component.scss']
})
export class SingleButtonComponent implements OnInit {
  @Input() greenText: string = "";
  @Input() greyed: boolean = false;
  @Output() green: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  public next(): void {
    if ( this.greyed ) {
      this.green.emit();
    }
  }
}