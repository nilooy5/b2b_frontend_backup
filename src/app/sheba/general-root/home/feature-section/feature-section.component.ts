import { Component, OnInit, Input } from '@angular/core';
import {HomeFeatureSection} from '../../../../types/general';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.scss']
})
export class FeatureSectionComponent implements OnInit {

  @Input() data: HomeFeatureSection;

  constructor() { }

  ngOnInit() {
  }

}
