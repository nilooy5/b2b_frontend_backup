import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-secondary-category-showcase',
    templateUrl: './secondary-category-showcase.component.html',
    styleUrls: ['./secondary-category-showcase.component.scss']
})
export class SecondaryCategoryShowcaseComponent implements OnInit {

    @Input() secondaryCategories: any;

    constructor() { }

    ngOnInit() { }

}
