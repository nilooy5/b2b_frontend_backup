import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {environment} from '../../../../../../environments/environment';
import { NumericFormat } from '../../../../../helpers/numeric_format.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-subscription-detail-tab',
  templateUrl: './subscription-detail-tab.component.html',
  styleUrls: ['./subscription-detail-tab.component.scss']
})
export class SubscriptionDetailTabComponent implements OnInit {
    @Input() orderDetail: any;

    type = 'SubscriptionOrder';
    typeId;
    price: any;
    duration: any;
    totalOrder: any;
    completedOrder: any;
    description: any;
    additionalInfo: any;
    subscriptionId: number;
    attachmentUploadUrl: any;
    attachments: any[] = [];


  constructor(private http: ShebaHttpService,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              public numericFormat: NumericFormat,
              private storage: StorageService) {
      this.attachmentUploadUrl = environment.api_url + 'v2/members/' + this.storage.user.member_id + '/attachments?token=' + this.storage.user.token;
      this.route.params.subscribe(params => {
          this.typeId = params.subscription_order_id;
      });
  }

  ngOnInit() {
      this.setData(this.orderDetail);
      this.getAttachments();
  }

    setData(data) {
        this.price = this.numericFormat.numberWithCommas(data.total_price);
        this.duration = data.subscription_period;
        this.totalOrder = data.total_orders;
        this.completedOrder = data.completed_orders;
        this.description = data.description;
        this.additionalInfo = data.subscription_additional_info;
    }

    getAttachments() {
      this.http.get('v2/members/' + this.storage.user.member_id + '/attachments?token=' + this.storage.user.token + '&type=SubscriptionOrder&type_id=' + this.typeId)
            .toPromise()
            .then(res => {
                this.attachments = res.attach_lists || [];
            });
    }

    handleUploaded() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    limitString(str) {
        return (str && str.length > 42) ? str.slice(0, 40) + '..' : str;
    }

}
