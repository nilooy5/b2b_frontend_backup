import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { ShebaHttpModule } from './modules/sheba-http/sheba-http.module';
import { AlertModule } from './modules/alert/alert.module';
import { PopAlertModule } from './modules/pop-alert/pop-alert.module';
import { ErrorStateMatcher, MAT_DIALOG_DEFAULT_OPTIONS, MatProgressBarModule } from '@angular/material';
import { CustomErrorStateMatcher } from './modules/extras/custom-error-state-matcher';
import { GlobalErrorHandler } from './modules/extras/global-error-handler';
import { OrderServiceModule } from './services/order-service/order-service.module';
import { DashboardResolveService } from './sheba/dashboard/dashboard-resolve.service';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { getErrorHandler } from './modules/extras/error-handler';




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ShebaApp'}),
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        TransferHttpCacheModule,
        PopAlertModule.forRoot(),
        ShebaHttpModule.forRoot(),
        AlertModule.forRoot(),
        OrderServiceModule.forRoot(),
        LazyLoadImageModule.forRoot({preset: intersectionObserverPreset}),
        NgtUniversalModule,
        MatProgressBarModule
    ],
    providers: [
        DashboardResolveService,
        {
            provide: ErrorStateMatcher,
            useClass: CustomErrorStateMatcher
        },
        {
            provide: ErrorHandler,
            useFactory: getErrorHandler
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {autoFocus: false, hasBackdrop: true}
        },
        // {
        //     provide: ErrorHandler,
        //     useClass: GlobalErrorHandler
        // },
    ]
})

export class AppModule { }
