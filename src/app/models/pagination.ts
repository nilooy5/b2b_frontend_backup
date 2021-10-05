export class Pagination {
    start: number = 1;
    end: number;
    total: number;
    step: number = 10;

    constructor(total: number, step?: number) {
        this.total = total;
        if (step) this.step = step;
        this.setEnd(this.start + this.step);
    }

    private setStart(start) {
        if(start > this.total) return;
        this.start = start;
        if(this.start < 1) this.start = 1;
    }

    private setEnd(end) {
        if(end < 1) return;
        this.end = end;
        if(this.end > this.total) this.end = this.total;
    }

    previous() {
        this.setStart(this.start - this.step);
        this.setEnd(this.start - this.step);
    }

    next() {
        this.setStart(this.start + this.step);
        this.setEnd(this.start + this.step);
    }
}
