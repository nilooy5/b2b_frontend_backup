import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogInvitationSentComponent} from './dialog-invitation-sent.component';

describe('DialogInvitationSentComponent', () => {
    let component: DialogInvitationSentComponent;
    let fixture: ComponentFixture<DialogInvitationSentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogInvitationSentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogInvitationSentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
