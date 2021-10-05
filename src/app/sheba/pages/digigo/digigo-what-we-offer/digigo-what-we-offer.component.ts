import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digigo-what-we-offer',
  templateUrl: './digigo-what-we-offer.component.html',
  styleUrls: ['./digigo-what-we-offer.component.scss']
})
export class DigigoWhatWeOfferComponent implements OnInit {
    pageData: any = {
        img: '../../../../../assets/svg/icons/digigo-landing/offers/bg.svg'
    };

  constructor() { }

  ngOnInit() {
  }

}
