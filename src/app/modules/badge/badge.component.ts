import { Component, Input } from '@angular/core';
import { IBadge } from './i-badge';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})

export class BadgeComponent {

    @Input() badge: IBadge;

}
