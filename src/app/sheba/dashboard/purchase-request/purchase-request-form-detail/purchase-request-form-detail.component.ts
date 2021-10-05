import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-purchase-request-form-detail',
  templateUrl: './purchase-request-form-detail.component.html',
  styleUrls: ['./purchase-request-form-detail.component.scss']
})
export class PurchaseRequestFormDetailComponent implements OnInit {

    details: any;
    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        public router: Router
    ) {
        this.route.data.subscribe(res => {
           this.details = res.detail;

        });
    }

    ngOnInit(): void {
    }

    editForm(id) {
        this.router.navigate(['/', 'dashboard', 'purchase-request', 'form-edit', {id}]).catch(err => {
            console.log(err);
        });
    }
}
