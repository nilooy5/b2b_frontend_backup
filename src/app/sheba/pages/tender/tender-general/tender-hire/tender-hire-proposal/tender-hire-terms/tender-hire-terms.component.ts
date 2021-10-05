import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tender-hire-terms',
  templateUrl: './tender-hire-terms.component.html',
  styleUrls: ['./tender-hire-terms.component.scss']
})
export class TenderHireTermsComponent implements OnInit {
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
