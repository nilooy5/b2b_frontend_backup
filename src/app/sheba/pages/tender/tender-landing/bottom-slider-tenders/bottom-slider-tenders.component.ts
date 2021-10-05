import { Component, OnInit, Input } from '@angular/core';
import { ResponsiveService } from '../../tender-services/tender-landing/responsive.service';

@Component({
  selector: 'app-bottom-slider-tenders',
  templateUrl: './bottom-slider-tenders.component.html',
  styleUrls: ['./bottom-slider-tenders.component.scss']
})
export class BottomSliderTendersComponent implements OnInit {
    tenders: any ;
    isMobileDevice: any;
    @Input()
    set tendersData(data: any) {
      this.tenders = data;
    }
    get tendersData() {
      return this.tenders;
    }
    constructor(private responsiveService: ResponsiveService) {}
    slideConfig = {  autoplay: true, arrows: false,
        autoplaySpeed: 1500, slidesToShow: 3, slidesToScroll: 1};

    ngOnInit() {
        this.responsiveService.getMobileStatus().subscribe( isMobile => {
            if (isMobile) {
              this.isMobileDevice = 1;
              this.slideConfig = {  autoplay: true, arrows: false,
                autoplaySpeed: 1500, slidesToShow: 1, slidesToScroll: 1};
            } else {
              this.isMobileDevice = 0;
              this.slideConfig = {  autoplay: true, arrows: false,
                autoplaySpeed: 1500, slidesToShow: 3, slidesToScroll: 1};
            }
          });
        this.onResize(0);
    }

     numberWithCommas(num: number) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    slickInit(e) {
      //  console.log('slick initialized');
    }

    breakpoint(e) {
       // console.log('breakpoint');
    }

    afterChange(e) {
       // console.log('afterChange');
    }

    beforeChange(e) {
      //  console.log('beforeChange');
    }
    onResize(event: any) {
        this.responsiveService.checkWidth();
      }
}
