import { Component, OnInit, Input } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-join-as-sp-section',
  templateUrl: './join-as-sp-section.component.html',
  styleUrls: ['./join-as-sp-section.component.scss']
})
export class JoinAsSpSectionComponent implements OnInit {

  @Input() data: any;
  environment = environment;

  constructor() { }

  ngOnInit() {
  }

}
