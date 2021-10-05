import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../types/users";
import {StorageService} from "../../../services/storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {appConfig} from "../../../config/app.config";
import {ShebaHttpService} from "../../sheba-http/sheba-http.service";
import {Comment} from "../../../types/fleet";
import {isToday, format as dateFormat, isYesterday} from "date-fns";
import {PopAlertService} from "../../pop-alert/pop-alert.service";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

    @Input() comments: Comment[] = [];
    @Input() user: User;
    @Input() title = 'Comments';
    @Input() postUrl: string;
    @Input() postUsertype = 'member';
    form: FormGroup;
    baseUrl: any;
    appConfig = appConfig;
    @Output() OnCommentUpdate: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private storage: StorageService,
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private pop: PopAlertService
    ) {
        this.form = this.fb.group({
            comment: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (!this.user) {
            this.user = this.storage.user;
        }

        if (this.postUsertype === 'business') {
            this.baseUrl = 'v2/businesses/' + this.storage.user.business_id + '/';
        } else {
            this.baseUrl = 'v2/members/' + this.storage.user.member_id + '/';
        }

    }

    submit() {
        if (this.form.valid) {
            this.http.post(this.baseUrl + this.postUrl, this.form.getRawValue()).toPromise().then(res => {
                if (res.code === 200) {
                    this.OnCommentUpdate.emit(true);
                    this.form.reset({comment: ''});
                } else {
                    this.pop.open(res.message);
                }
            })
        }
    }

    getCommentDate(date: string) {
        try {
            let data = new Date();
            let output = '';
            let d = Date.parse(date);
            if (d) data = new Date(d);
            if (isToday(data)) {
                output += 'Today at ' + dateFormat(data, "HH:MM A");
            } else if (isYesterday(data)) {
                output += 'Yesterday at ' + dateFormat(data, 'HH:MM A');
            } else {
                output += dateFormat(data, 'ddd HH:MM A, MMM Do YYYY ')
            }
            return output;
        } catch (e) {
            return '';
        }
    }
}
