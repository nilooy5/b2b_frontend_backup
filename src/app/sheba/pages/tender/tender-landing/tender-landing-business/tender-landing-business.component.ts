import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tender-landing-business',
  templateUrl: './tender-landing-business.component.html',
  styleUrls: ['./tender-landing-business.component.scss']
})
export class TenderLandingBusinessComponent implements OnInit {

    statistics: any ;
    isMobileDevice = false;
    @Input()
    set deviceResolution(data: any) {
      this.isMobileDevice = data;
    }
    get deviceResolution() {
      return this.isMobileDevice;
    }
    @Input()
    set statisticsData(data: any) {
      this.statistics = data;
    }
    get statisticsData() {
      return this.statistics;
    }
  constructor() { }

  ngOnInit() {

  }

}
