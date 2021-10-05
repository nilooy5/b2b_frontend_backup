import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trusted-by-section',
  templateUrl: './trusted-by-section.component.html',
  styleUrls: ['./trusted-by-section.component.scss']
})
export class TrustedBySectionComponent implements OnInit {

  @Input() showTitle: boolean;

  constructor() { }

  ngOnInit() {
  }

}
