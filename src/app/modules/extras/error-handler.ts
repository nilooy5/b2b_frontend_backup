import { ErrorHandler} from '@angular/core';
import { environment } from '../../../environments/environment';
import * as Sentry from '@sentry/browser';

export class SentryErrorHandler implements ErrorHandler {
    constructor() {
        Sentry.init({
            dsn: environment.sentry_key
        });
    }

    handleError(error) {
        Sentry.captureException(error.originalError || error);
    }
}


export function getErrorHandler(): ErrorHandler {
    if (environment.production) {
        return new SentryErrorHandler();
    }
    return new ErrorHandler();
}
