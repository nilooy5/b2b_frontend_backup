import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-quotation-table',
  templateUrl: './price-quotation-table.component.html',
  styleUrls: ['./price-quotation-table.component.scss']
})
export class PriceQuotationTableComponent implements OnInit {
    tenderHireDetails: any;
    @Input()
    set tenderHireDetailsData(data: any) {
      this.tenderHireDetails = data;
     // console.log(this.tenders);
    }
    get tenderHireDetailsData() {
      return this.tenderHireDetails;
    }

    displayedColumns = ['sl', 'item', 'specifications', 'unit' , 'yourProposal', 'final'];
    dataSource : any ;
  constructor() { }

  ngOnInit() {
      this.dataSource = this.tenderHireDetails.price_quotations;
  }

}
