import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitStringPipe } from './limit-string.pipe';

@NgModule({
    declarations: [ LimitStringPipe ],
    imports: [ CommonModule ],
    exports: [ LimitStringPipe ]
})

export class LimitStringModule {

    static forRoot() {
        return {
            ngModule: LimitStringModule,
            providers: [],
        };
    }
}
