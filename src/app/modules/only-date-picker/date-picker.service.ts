import {Injectable} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DatePickerService {

    overlayRef: OverlayRef;
    positionStrategy: OverlayConfig;
    Behavior: BehaviorSubject<number[]> = new BehaviorSubject([]);

    constructor(
        private overlay: Overlay
    ) {
    }

    open(input: HTMLInputElement, portal: ComponentPortal<DatePickerComponent>) {
        const strategy = this.overlay.position().flexibleConnectedTo(input);
        this.positionStrategy = {
            positionStrategy: strategy.withPositions(DatePickerService.getPositions()).withPush(false),
            hasBackdrop: true,
            backdropClass: 'only-date-picker',
            disposeOnNavigation: true,
            maxHeight: '400px',
            maxWidth: '400px',
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        };
        this.overlayRef = this.overlay.create(this.positionStrategy);
        this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(res => {
            this.closeOverlay();
        });
        return this.overlayRef;
    }

    static getPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            }

        ]
    }

    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }
}
