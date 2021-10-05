import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-rfq-details-show-advanced',
    templateUrl: './rfq-details-show-advanced.component.html',
    styleUrls: ['./rfq-details-show-advanced.component.scss']
})
export class RfqDetailsShowAdvancedComponent implements OnInit {

    @Input() procurementDetails;

    rfqId;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit'];
    quotationList;
    technical_evaluation;
    company_evaluation;
    can_edit;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.rfqId = activatedRoute.snapshot.parent.parent.params.id;
    }

    ngOnInit() {
        if (this.procurementDetails.price_quotation) {
            this.quotationList = this.procurementDetails.price_quotation.map(item => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit,
                };
            });
            this.dataSource = this.quotationList;
        }
        if (this.procurementDetails.technical_evaluation) {
            this.technical_evaluation = this.procurementDetails.technical_evaluation.map(item => {
                return {
                    title: item.title,
                    type: item.input_type,
                    options: JSON.parse(item.variables).options,
                };
            });
        }
        if (this.procurementDetails.company_evaluation) {
            this.company_evaluation = this.procurementDetails.company_evaluation.map(item => {
                return {
                    title: item.title,
                    type: item.input_type,
                    options: JSON.parse(item.variables).options,
                };
            });
        }
        this.can_edit = this.procurementDetails.status === 'Draft';
    }

    redirectToEditRoute(routerName: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqId, 'details', 'edit', routerName]);
    }
}
