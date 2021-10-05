import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-image-file-input',
    templateUrl: './image-file-input.component.html',
    styleUrls: ['./image-file-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageFileInputComponent),
            multi: true
        }
    ]
})
export class ImageFileInputComponent implements OnInit, ControlValueAccessor {

    @Input() showPreview = true;
    @Input() type = 'person';

    @Output() upload = new EventEmitter<any>();

    previewSource: any;
    selectedFile: any;

    constructor() {
    }

    change;

    ngOnInit() {

    }

    registerOnChange(fn: any): void {
        this.change = fn;
    }

    OnChange(event: any) {
        // @ts-ignore
        this.change(event.target.files[0]);
        this.selectedFile = event.target.files[0];

        console.log(this.selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
            const target = e.target as any;
            this.previewSource = target.result;
        };

        this.upload.emit(event.target.files[0]);

        reader.readAsDataURL(event.target.files[0]);
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

}
