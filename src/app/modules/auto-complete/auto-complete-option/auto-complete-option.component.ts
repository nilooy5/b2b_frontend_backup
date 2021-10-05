import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-auto-complete-option',
  templateUrl: './auto-complete-option.component.html',
  styleUrls: ['./auto-complete-option.component.scss']
})
export class AutoCompleteOptionComponent implements OnInit {

  @Input() value: any;
  @HostBinding('class.auto-complete-option') option = true;

  constructor() {
  }

  ngOnInit() {
  }

}
