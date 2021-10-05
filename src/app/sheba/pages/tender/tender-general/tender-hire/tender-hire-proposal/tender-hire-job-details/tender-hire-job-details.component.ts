import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tender-hire-job-details',
  templateUrl: './tender-hire-job-details.component.html',
  styleUrls: ['./tender-hire-job-details.component.scss']
})
export class TenderHireJobDetailsComponent implements OnInit {
    isExpand = false;
    tenderHireDetails: any;
    priceQuotations: any;
    @Input()
    set jobDetail(data: any) {
      this.tenderHireDetails = data;
     // console.log(this.tenders);
    }
    get jobDetail() {
      return this.tenderHireDetails;
    }
  constructor() { }

  ngOnInit() {
  }

}
