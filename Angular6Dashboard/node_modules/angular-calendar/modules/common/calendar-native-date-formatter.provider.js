import getISOWeek from 'date-fns/get_iso_week/index';
/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
var /**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
CalendarNativeDateFormatter = /** @class */ (function () {
    function CalendarNativeDateFormatter() {
    }
    /**
     * The month view header week day labels
     */
    /**
       * The month view header week day labels
       */
    CalendarNativeDateFormatter.prototype.monthViewColumnHeader = /**
       * The month view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    };
    /**
     * The month view cell day number
     */
    /**
       * The month view cell day number
       */
    CalendarNativeDateFormatter.prototype.monthViewDayNumber = /**
       * The month view cell day number
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
    };
    /**
     * The month view title
     */
    /**
       * The month view title
       */
    CalendarNativeDateFormatter.prototype.monthViewTitle = /**
       * The month view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long'
        }).format(date);
    };
    /**
     * The week view header week day labels
     */
    /**
       * The week view header week day labels
       */
    CalendarNativeDateFormatter.prototype.weekViewColumnHeader = /**
       * The week view header week day labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    };
    /**
     * The week view sub header day and month labels
     */
    /**
       * The week view sub header day and month labels
       */
    CalendarNativeDateFormatter.prototype.weekViewColumnSubHeader = /**
       * The week view sub header day and month labels
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short'
        }).format(date);
    };
    /**
     * The week view title
     */
    /**
       * The week view title
       */
    CalendarNativeDateFormatter.prototype.weekViewTitle = /**
       * The week view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        var year = new Intl.DateTimeFormat(locale, {
            year: 'numeric'
        }).format(date);
        var weekNumber = getISOWeek(date);
        return "Week " + weekNumber + " of " + year;
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    /**
       * The time formatting down the left hand side of the day view
       */
    CalendarNativeDateFormatter.prototype.dayViewHour = /**
       * The time formatting down the left hand side of the day view
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    };
    /**
     * The day view title
     */
    /**
       * The day view title
       */
    CalendarNativeDateFormatter.prototype.dayViewTitle = /**
       * The day view title
       */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }).format(date);
    };
    return CalendarNativeDateFormatter;
}());
/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
export { CalendarNativeDateFormatter };
//# sourceMappingURL=calendar-native-date-formatter.provider.js.map