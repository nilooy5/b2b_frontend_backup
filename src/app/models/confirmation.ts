const ConfirmationTypes = {
    success: 'success',
    failure: 'failure'
};

export { ConfirmationTypes };

export class Confirmation {
    private _isShown: boolean = false;
    private _type: string;
    private _title: string;
    private _message: string;
    private _showAnotherButton: boolean = true;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    show() {
        this._isShown = true;
    }

    hide() {
        this._isShown = false;
    }

    get isShown(): boolean {
        return this._isShown;
    }

    get isHidden(): boolean {
        return !this._isShown;
    }

    get showAnotherButton(): boolean {
        return this._showAnotherButton;
    }

    set showAnotherButton(value: boolean) {
        this._showAnotherButton = value;
    }
}
