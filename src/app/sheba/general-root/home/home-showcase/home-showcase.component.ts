import { Component, OnInit, Input  } from '@angular/core';
import {HomeShowcase} from '../../../../types/general';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.scss']
})
export class HomeShowcaseComponent implements OnInit {

  @Input() data: HomeShowcase;
  @Input() cardAlignment: string;
  @Input() theme: string;

  constructor() { }

  ngOnInit() {
  }

}
