// @ts-ignore
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

declare global {
    interface Date {
        toMySqlFormat: () => string;
        fromMySqlFormat: (value: string) => Date;
        getMonthName: () => string;
        isLeapYear: () => boolean;
        getDaysInMonth: () => number;
        addDays: (value: number) => Date;
        addMonths: (value: number) => Date;
        toNgbDateStruct: () => NgbDateStruct;
        fromNgbDateStruct: (date: NgbDateStruct) => Date;
        isSmallerThan: (date: Date) => boolean;
        isGreaterThan: (date: Date) => boolean;
        isSmallerThanOrEqualTo: (date: Date) => boolean;
        isPast: () => boolean;
        isFuture: () => boolean;
        copy: () => Date;
        firstDayOfMonth: () => Date;
        lastDayOfMonth: () => Date;
    }
}

declare global {
    interface String {
        trimAny: (c) => string;
    }
}

(function() {
    // @ts-ignore
    Date.prototype.toMySqlFormat = function() {
        let month = '' + (this.getMonth() + 1),
            day = '' + this.getDate(),
            year = this.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    };

    Date.prototype.fromMySqlFormat = function(value) {
        let t = value.split(/[- :]/).map(n => parseInt(n));
        return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
    };

    Date.prototype.getMonthName = function () {
        return this.toLocaleString('default', { month: 'long' });
    };

    const isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };

    const getDaysInMonth = function (year, month) {
        return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    Date.prototype.isLeapYear = function () {
        return isLeapYear(this.getFullYear());
    };

    Date.prototype.getDaysInMonth = function () {
        return getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addDays = function (value) {
        const date = this;
        date.setDate(date.getDate() + value);
        return date;
    };

    Date.prototype.addMonths = function (value) {
        let n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };

    Date.prototype.toNgbDateStruct = function() {
        return {
            day: this.getDate(), month: this.getMonth() + 1, year: this.getFullYear()
        };
    };

    /**
     * TODO
     * THIS IS SHIT
     * Re think about prototyping approach.
     */
    Date.prototype.fromNgbDateStruct = function (date: NgbDateStruct) : Date {
        return new Date(date.year, date.month - 1, date.day);
    };

    Date.prototype.isSmallerThan = function (date: Date) : boolean {
        let this_date = new Date(this.toMySqlFormat());
        date = new Date(date.toMySqlFormat());
        return this_date.getTime() < date.getTime();
    };

    Date.prototype.isSmallerThanOrEqualTo = function (date: Date) : boolean {
        let this_date = new Date(this.toMySqlFormat());
        date = new Date(date.toMySqlFormat());
        return this_date.getTime() <= date.getTime();
    };

    Date.prototype.isGreaterThan = function (date: Date) : boolean {
        let this_date = new Date(this.toMySqlFormat());
        date = new Date(date.toMySqlFormat());
        return this_date.getTime() > date.getTime();
    };

    Date.prototype.isPast = function () : boolean {
        return this.isSmallerThan(new Date());
    };

    Date.prototype.isFuture = function () : boolean {
        return this.isGreaterThan(new Date());
    };

    Date.prototype.copy = function () : Date {
        return new Date(this.getTime());
    };

    Date.prototype.lastDayOfMonth = function () : Date {
        return new Date(this.addMonths(1).setDate(0));
    };

    Date.prototype.firstDayOfMonth = function () : Date {
        return new Date(this.setDate(1));
    };
})();

(function () {
    String.prototype.trimAny = function(c) {
        if (c === "]") c = "\\]";
        if (c === "\\") c = "\\\\";
        return this.replace(new RegExp(
            "^[" + c + "]+|[" + c + "]+$", "g"
        ), "");
    }
})();

export default {};
