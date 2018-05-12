import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  text: string;
  @Input() pageName;
  @Output() out = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  textOut() {
    this.out.emit(this.text);
  }

}
