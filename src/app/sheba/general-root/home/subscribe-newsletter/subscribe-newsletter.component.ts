import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';

@Component({
  selector: 'app-subscribe-newsletter',
  templateUrl: './subscribe-newsletter.component.html',
  styleUrls: ['./subscribe-newsletter.component.scss']
})
export class SubscribeNewsletterComponent implements OnInit {

    email = new FormControl('');

    constructor(private fb: FormBuilder,
                private pop: PopAlertService,
                private http: ShebaHttpService) { }

  ngOnInit() {
  }

  onClick() {
        if (this.email.valid) {
            console.log(this.email.value);

            const data = {
                email: this.email.value,
                portal_name: 'business-portal'
            };

            this.http.post('v2/newsletter', data).toPromise().then((res) => {
                if (res.code === 200) {
                    this.email.reset();
                } else {
                     this.pop.open(res.message);
                }
            });
        }
  }

}
