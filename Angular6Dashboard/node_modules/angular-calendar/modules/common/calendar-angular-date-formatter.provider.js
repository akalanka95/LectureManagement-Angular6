import getISOWeek from 'date-fns/get_iso_week/index';
import { DatePipe } from '@angular/common';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
var /**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
CalendarAngularDateFormatter = /** @class */ (function () {
    function CalendarAngularDateFormatter() {
    }
    /**
     * The month view header week day labels
     */
    /**
       * The month view header week day labels
       */
    CalendarAngularDateFormatter.prototype.monthViewColumnHeader = /**
       * The month view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The month view cell day number
     */
    /**
       * The month view cell day number
       */
    CalendarAngularDateFormatter.prototype.monthViewDayNumber = /**
       * The month view cell day number
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'd', null, locale);
    };
    /**
     * The month view title
     */
    /**
       * The month view title
       */
    CalendarAngularDateFormatter.prototype.monthViewTitle = /**
       * The month view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMMM y', null, locale);
    };
    /**
     * The week view header week day labels
     */
    /**
       * The week view header week day labels
       */
    CalendarAngularDateFormatter.prototype.weekViewColumnHeader = /**
       * The week view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The week view sub header day and month labels
     */
    /**
       * The week view sub header day and month labels
       */
    CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = /**
       * The week view sub header day and month labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMM d', null, locale);
    };
    /**
     * The week view title
     */
    /**
       * The week view title
       */
    CalendarAngularDateFormatter.prototype.weekViewTitle = /**
       * The week view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        var year = new DatePipe(locale).transform(date, 'y', null, locale);
        var weekNumber = getISOWeek(date);
        return "Week " + weekNumber + " of " + year;
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    /**
       * The time formatting down the left hand side of the day view
       */
    CalendarAngularDateFormatter.prototype.dayViewHour = /**
       * The time formatting down the left hand side of the day view
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'h a', null, locale);
    };
    /**
     * The day view title
     */
    /**
       * The day view title
       */
    CalendarAngularDateFormatter.prototype.dayViewTitle = /**
       * The day view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE, MMMM d, y', null, locale);
    };
    return CalendarAngularDateFormatter;
}());
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
export { CalendarAngularDateFormatter };
//# sourceMappingURL=calendar-angular-date-formatter.provider.js.map