import { Component, OnInit } from '@angular/core';
import {RfqStorageService} from '../../../../../../services/rfq-storage-service/rfq-storage.service';

@Component({
  selector: 'app-rfq-create-advance-summary',
  templateUrl: './rfq-create-advance-summary.component.html',
  styleUrls: ['./rfq-create-advance-summary.component.scss']
})
export class RfqCreateAdvanceSummaryComponent implements OnInit {

    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit'];
    priceQuotationDataSource;
    technicalEvaluationQuestions;
    companyEvaluationQuestions;

  constructor(private rfqStorageService: RfqStorageService) {
      this.priceQuotationDataSource = this.rfqStorageService.PriceQuotation ? this.rfqStorageService.PriceQuotation : [];
      this.technicalEvaluationQuestions = this.rfqStorageService.TechnicalEvaluation ? this.rfqStorageService.TechnicalEvaluation : [];
      this.companyEvaluationQuestions = this.rfqStorageService.CompanyEvaluation ? this.rfqStorageService.CompanyEvaluation : [];
  }

  ngOnInit() {
  }

}
