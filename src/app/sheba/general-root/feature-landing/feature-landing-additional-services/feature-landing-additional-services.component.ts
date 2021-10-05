import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature-landing-additional-services',
  templateUrl: './feature-landing-additional-services.component.html',
  styleUrls: ['./feature-landing-additional-services.component.scss']
})
export class FeatureLandingAdditionalServicesComponent implements OnInit {

    @Input() services: string;

    contents: any = {
        facility: [
            {
                image: '../../../../../assets/img/landing/services/appliance.png',
                label: 'Appliance Repair'
            },
            {
                image: '../../../../../assets/img/landing/services/shifting.png',
                label: 'Shifting'
            },
            {
                image: '../../../../../assets/img/landing/services/gadget.png',
                label: 'Gadgets Repair'
            },
            {
                image: '../../../../../assets/img/landing/services/beauty.png',
                label: 'Beauty Services'
            },
            {
                image: '../../../../../assets/img/landing/services/laundry.png',
                label: 'Laundry Home Service'
            },
            {
                image: '../../../../../assets/img/landing/services/cleaning.png',
                label: 'Cleaning & Pest Control'
            },
        ]
    };

  constructor() { }

  ngOnInit() {
      const slider = document.getElementById('slider');
      if (slider && slider.style) {
          slider.style.width = (100 * 6 + 50)  + 'px';
      }
  }

}
