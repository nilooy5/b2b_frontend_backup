import { Deserializable } from './deserializable';

export class Category extends Deserializable {
    id: number;
    parent: Category;
    name: string;
    thumb: string;

    deserialize(input: any) {
        const parent = input.parent;
        delete input.parent_id;
        Object.assign(this, input);
        this.parent = new Category(parent);
        return this;
    }
}
