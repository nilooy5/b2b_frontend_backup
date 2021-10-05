import {Component, Renderer2, Inject, isDevMode} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {WINDOW} from '@ng-toolkit/universal';
import { environment } from '../environments/environment';
import {StorageService} from './services/storage.service';
import {SwRegisterService} from './sw-register.service';
import {DOCUMENT} from '@angular/common';
// import io from 'socket.io-client';
// const socket = io('https://www.dev-sheba.xyz:3000');

declare const $crisp: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Sheba B2B Frontend';
    loading: boolean;

    constructor(
        private router: Router,
        @Inject(WINDOW) private window,
        private storage: StorageService,
        private renderer2: Renderer2,
        private sWRegisterService: SwRegisterService,
        @Inject(DOCUMENT) private document
    ) {
        this.checkPopoverStatusFromStorage();
        this.storage.userWatcher.subscribe((user) => {
            if (user) {
                if (user.email !== undefined && user.email !== null) {
                    if (typeof this.window.$crisp === 'undefined') {
                        this.renderCrispScript(user);
                        window.$crisp.push(['do', 'chat:show']);
                        window.$crisp.push(['do', 'chat:close']);
                        window.$crisp.push(['set', 'user:nickname', user.name]);
                        window.$crisp.push(['set', 'user:email', user.email]);
                        window.$crisp.push(['set', 'user:avatar', user.pro_pic]);
                    }
                }
            }
        });
        if (!isDevMode()) {
            console.log('%cPlease Stop!', 'color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;');
            console.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a  feature or "hack" someone\'s account, it is a scam and will give them access to your account.', 'color: #444; font-family: sans-serif; font-size: 1.5em; font-weight: medium;');
            console.log = function() {
            };
        }
        router.events.subscribe(res => {
            if (res instanceof NavigationStart) {
                this.loading = true;
            }
            if (res instanceof NavigationEnd) {
                this.loading = false;
                this.window.scrollTo({top: 0, behavior: 'auto'});
            }
            if (res instanceof NavigationError) {
                this.loading = false;
            }
            if (res instanceof NavigationCancel) {
                this.loading = false;
            }
        });

        this.integrateGoogleAnalytics();

        if(this.storage.user !== null) {
            this.sWRegisterService.registerServiceWorker();
        }

        // socket.on('notification-channel:Sheba\\Notification\\NotificationCreated', (response) => {
        //     console.log(response);
        // });
    }

    integrateGoogleAnalytics() {
        const gaId = `'${environment.google_analytics_id}'`;

        const code = `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            window.ga = ga;

            ga('create', ${gaId}, 'auto');  // <- add the UA-ID
            ga('send', 'pageview');
        `;

        this.renderScript(code);
    }

    integrateAmplitude() {
        const amplitudeId = `'${environment.amplitude_id}'`;

        // sha384-d/yhnowERvm+7eCU79T/bYjOiMmq4F11ElWYLmt0ktvYEVgqLDazh4+gW9CKMpYW

        const code = `
           (function(e, t) {
            var n = e.amplitude || {
                _q: [],
                _iq: {}
            };
            var r = t.createElement("script");
            r.type = "text/javascript";
            r.integrity = "";
            r.crossOrigin = "anonymous";
            r.async = true;
            r.src = "https://cdn.amplitude.com/libs/amplitude-5.7.0-min.gz.js";
            r.onload = function() {
                if (!e.amplitude.runQueuedFunctions) {
                    console.log("[Amplitude] Error: could not load SDK")
                }
            };
            var i = t.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(r, i);

            function s(e, t) {
                e.prototype[t] = function() {
                    this._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
                    return this
                }
            }
            var o = function() {
                this._q = [];
                return this
            };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
            for (var u = 0; u < a.length; u++) {
                s(o, a[u])
            }
            n.Identify = o;
            var c = function() {
                this._q = [];
                return this
            };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) {
                s(c, l[p])
            }
            n.Revenue = c;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];

            function v(e) {
                function t(t) {
                    e[t] = function() {
                        e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
                    }
                }
                for (var n = 0; n < d.length; n++) {
                    t(d[n])
                }
            }
            v(n);
            n.getInstance = function(e) {
                e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase();
                if (!n._iq.hasOwnProperty(e)) {
                    n._iq[e] = {
                        _q: []
                    };
                    v(n._iq[e])
                }
                return n._iq[e]
            };
            e.amplitude = n
        })(window, document);

        amplitude.getInstance().init("5cacbcd61dd45142ff62179c7325a138");
        `;
        this.renderScript(code);
    }

    renderScript(code) {
        const s = this.renderer2.createElement('script');
        s.type = 'text/javascript';
        s.text = code;
        this.renderer2.appendChild(this.document.body, s);
    }

    renderCrispScript(user) {
        const s = this.renderer2.createElement('script');
        s.type = 'text/javascript';
        s.text = `
            window.$crisp = [];
            window.CRISP_WEBSITE_ID="${environment.crisp_id}";
            window.CRISP_TOKEN_ID="${user.remember_token}";
            (function(){
                d=document;
                s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
            })();
        `;
        this.renderer2.appendChild(this.document.body, s);
    }

    checkPopoverStatusFromStorage() {
        localStorage.getItem('showPopover') && localStorage.getItem('showPopover') !== undefined ?
            JSON.parse(localStorage.getItem('showPopover')) : localStorage.setItem('showPopover', JSON.stringify(true));
    }


}
