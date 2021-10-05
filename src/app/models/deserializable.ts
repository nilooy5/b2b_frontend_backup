export abstract class Deserializable {
    constructor(input?: any) {
        if (input) {
            this.deserialize(input);
        }
    }

    abstract deserialize(input: any): this;
}
