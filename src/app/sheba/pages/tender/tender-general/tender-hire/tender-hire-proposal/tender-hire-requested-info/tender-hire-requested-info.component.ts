import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tender-hire-requested-info',
  templateUrl: './tender-hire-requested-info.component.html',
  styleUrls: ['./tender-hire-requested-info.component.scss']
})
export class TenderHireRequestedInfoComponent implements OnInit {
    tenderHireDetails: any;
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
