import { ServiceOptions } from './service-options';
import { Category } from './category';
import { Deserializable } from './deserializable';

export class Service extends Deserializable {
    id: number;
    category: Category;
    name: string;
    thumb: string;
    unit?: string;
    min_quantity: number;
    variable_type: string;
    options: Array<ServiceOptions>;

    deserialize(input: any) {
        const options = input.questions || input.options;
        const category = input.category;
        delete input.category;
        Object.assign(this, input);
        this.category = new Category(category);
        this.options = this.isOptions() ? options.map(option => new ServiceOptions(option)) : [];
        this.min_quantity = this.min_quantity || 1;
        return this;
    }

    isOptions() {
        return this.variable_type === 'Options';
    }
}
