import {Component, Input, OnInit} from '@angular/core';
import {SettingsItem} from '../../types/general';

@Component({
    selector: 'app-feature-settings',
    templateUrl: './feature-settings.component.html',
    styleUrls: ['./feature-settings.component.scss']
})
export class FeatureSettingsComponent implements OnInit {

    @Input() settingsTitle: string;
    @Input() settingsItems: SettingsItem[];

    settings = [
        {
            title: 'test',
            iconName: 'settings',
            path: '/dashboard/quick-purchase'
        },
        {
            title: 'test',
            iconName: 'settings',
            path: '/dashboard/quick-purchase'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
