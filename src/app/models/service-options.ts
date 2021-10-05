import { Deserializable } from './deserializable';

export class ServiceOptions extends Deserializable {
    question: string;
    answers: Array<string>;
    input_type: string;
    screen: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    isSelectBox() {
        return this.input_type === 'selectbox';
    }

    isRadioBox() {
        return this.input_type === 'radiobox';
    }

    isDropdown() {
        return this.input_type === 'dropdown';
    }
}
