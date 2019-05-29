import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() data;
  @Output() valueUpdated = new EventEmitter();

  updated() {
    this.valueUpdated.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}