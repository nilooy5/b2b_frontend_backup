import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-service-provider-tab',
  templateUrl: './subscription-service-provider-tab.component.html',
  styleUrls: ['./subscription-service-provider-tab.component.scss']
})
export class SubscriptionServiceProviderTabComponent implements OnInit {

    @Input() serviceProviderInfo;
    serviceProvider: any;

  constructor() { }

  ngOnInit() {
      this.serviceProvider = this.serviceProviderInfo;
  }

}
