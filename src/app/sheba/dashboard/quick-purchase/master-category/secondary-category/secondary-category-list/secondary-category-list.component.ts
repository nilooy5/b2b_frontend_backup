import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-secondary-category-list',
    templateUrl: './secondary-category-list.component.html',
    styleUrls: ['./secondary-category-list.component.scss']
})

export class SecondaryCategoryListComponent implements OnInit {

    @Input() masterCategory: any;

    constructor() { }

    ngOnInit() { }

}
