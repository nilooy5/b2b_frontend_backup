import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription-service/subscription.service';

@Component({
  selector: 'app-subscription-breadcrumb',
  templateUrl: './subscription-breadcrumb.component.html',
  styleUrls: ['./subscription-breadcrumb.component.scss']
})
export class SubscriptionBreadcrumbComponent implements OnInit {

  subscription: any;

  constructor(
      private subscriptionService: SubscriptionService
  ) {
    this.subscription = this.subscriptionService.Subscription;
  }

  ngOnInit() {
  }

}
