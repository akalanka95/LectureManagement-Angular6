import { InjectionToken, Inject } from '@angular/core';
export var MOMENT = new InjectionToken('Moment');
/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
var CalendarMomentDateFormatter = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarMomentDateFormatter(moment) {
        this.moment = moment;
    }
    /**
     * The month view header week day labels
     */
    /**
       * The month view header week day labels
       */
    CalendarMomentDateFormatter.prototype.monthViewColumnHeader = /**
       * The month view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    };
    /**
     * The month view cell day number
     */
    /**
       * The month view cell day number
       */
    CalendarMomentDateFormatter.prototype.monthViewDayNumber = /**
       * The month view cell day number
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('D');
    };
    /**
     * The month view title
     */
    /**
       * The month view title
       */
    CalendarMomentDateFormatter.prototype.monthViewTitle = /**
       * The month view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('MMMM YYYY');
    };
    /**
     * The week view header week day labels
     */
    /**
       * The week view header week day labels
       */
    CalendarMomentDateFormatter.prototype.weekViewColumnHeader = /**
       * The week view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    };
    /**
     * The week view sub header day and month labels
     */
    /**
       * The week view sub header day and month labels
       */
    CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = /**
       * The week view sub header day and month labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('D MMM');
    };
    /**
     * The week view title
     */
    /**
       * The week view title
       */
    CalendarMomentDateFormatter.prototype.weekViewTitle = /**
       * The week view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('[Week] W [of] YYYY');
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    /**
       * The time formatting down the left hand side of the day view
       */
    CalendarMomentDateFormatter.prototype.dayViewHour = /**
       * The time formatting down the left hand side of the day view
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('ha');
    };
    /**
     * The day view title
     */
    /**
       * The day view title
       */
    CalendarMomentDateFormatter.prototype.dayViewTitle = /**
       * The day view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd, D MMMM, YYYY');
    };
    /** @nocollapse */
    CalendarMomentDateFormatter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MOMENT,] },] },
    ]; };
    return CalendarMomentDateFormatter;
}());
export { CalendarMomentDateFormatter };
//# sourceMappingURL=calendar-moment-date-formatter.provider.js.map