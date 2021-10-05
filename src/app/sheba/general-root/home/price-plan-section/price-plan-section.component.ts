import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-plan-section',
  templateUrl: './price-plan-section.component.html',
  styleUrls: ['./price-plan-section.component.scss']
})
export class PricePlanSectionComponent implements OnInit {

  @Input() data: Array<any>;

  activePrice: any = 1;

  constructor() { }

  ngOnInit() {
  }

}
