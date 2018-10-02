/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.monthViewColumnHeader = /**
     * The month view header week day labels
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.monthViewDayNumber = /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'd', null, locale);
    };
    /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.monthViewTitle = /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMMM y', null, locale);
    };
    /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnHeader = /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMM d', null, locale);
    };
    /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.weekViewTitle = /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        var /** @type {?} */ year = new DatePipe(locale).transform(date, 'y', null, locale);
        var /** @type {?} */ weekNumber = getISOWeek(date);
        return "Week " + weekNumber + " of " + year;
    };
    /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.dayViewHour = /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'h a', null, locale);
    };
    /**
     * The day view title
     * @param {?} __0
     * @return {?}
     */
    CalendarAngularDateFormatter.prototype.dayViewTitle = /**
     * The day view title
     * @param {?} __0
     * @return {?}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1hbmd1bGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLFVBQVUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLM0M7OztBQUFBOzs7Ozs7OztJQUtTLDREQUFxQjs7Ozs7Y0FBQyxFQUFxQztZQUFuQyxjQUFJLEVBQUUsa0JBQU07UUFDekMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7OztJQU03RCx5REFBa0I7Ozs7O2NBQUMsRUFBcUM7WUFBbkMsY0FBSSxFQUFFLGtCQUFNO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFNMUQscURBQWM7Ozs7O2NBQUMsRUFBcUM7WUFBbkMsY0FBSSxFQUFFLGtCQUFNO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFNL0QsMkRBQW9COzs7OztjQUFDLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUN4QyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0lBTTdELDhEQUF1Qjs7Ozs7Y0FBQyxFQUdUO1lBRnBCLGNBQUksRUFDSixrQkFBTTtRQUVOLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFNOUQsb0RBQWE7Ozs7O2NBQUMsRUFBcUM7WUFBbkMsY0FBSSxFQUFFLGtCQUFNO1FBQ2pDLHFCQUFNLElBQUksR0FBVyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELElBQUksRUFDSixHQUFHLEVBQ0gsSUFBSSxFQUNKLE1BQU0sQ0FDUCxDQUFDO1FBQ0YscUJBQU0sVUFBVSxHQUFXLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsVUFBUSxVQUFVLFlBQU8sSUFBTSxDQUFDOzs7Ozs7O0lBTWxDLGtEQUFXOzs7OztjQUFDLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUMvQixNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0lBTTVELG1EQUFZOzs7OztjQUFDLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNoQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNuQyxJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCLElBQUksRUFDSixNQUFNLENBQ1AsQ0FBQzs7dUNBaEZOO0lBa0ZDLENBQUE7Ozs7QUF4RUQsd0NBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlLFxuICBEYXRlRm9ybWF0dGVyUGFyYW1zXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCBnZXRJU09XZWVrIGZyb20gJ2RhdGUtZm5zL2dldF9pc29fd2Vlay9pbmRleCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyB3aWxsIHVzZSB0aGUgYW5ndWxhciBkYXRlIHBpcGUgdG8gZG8gYWxsIGRhdGUgZm9ybWF0dGluZy4gSXQgaXMgdGhlIGRlZmF1bHQgZGF0ZSBmb3JtYXR0ZXIgdXNlZCBieSB0aGUgY2FsZW5kYXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyXG4gIGltcGxlbWVudHMgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnRUVFRScsIG51bGwsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgY2VsbCBkYXkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ2QnLCBudWxsLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnTU1NTSB5JywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IERhdGVQaXBlKGxvY2FsZSkudHJhbnNmb3JtKGRhdGUsICdFRUVFJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHN1YiBoZWFkZXIgZGF5IGFuZCBtb250aCBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7XG4gICAgZGF0ZSxcbiAgICBsb2NhbGVcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnTU1NIGQnLCBudWxsLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHllYXI6IHN0cmluZyA9IG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShcbiAgICAgIGRhdGUsXG4gICAgICAneScsXG4gICAgICBudWxsLFxuICAgICAgbG9jYWxlXG4gICAgKTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyOiBudW1iZXIgPSBnZXRJU09XZWVrKGRhdGUpO1xuICAgIHJldHVybiBgV2VlayAke3dlZWtOdW1iZXJ9IG9mICR7eWVhcn1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGZvcm1hdHRpbmcgZG93biB0aGUgbGVmdCBoYW5kIHNpZGUgb2YgdGhlIGRheSB2aWV3XG4gICAqL1xuICBwdWJsaWMgZGF5Vmlld0hvdXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnaCBhJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShcbiAgICAgIGRhdGUsXG4gICAgICAnRUVFRSwgTU1NTSBkLCB5JyxcbiAgICAgIG51bGwsXG4gICAgICBsb2NhbGVcbiAgICApO1xuICB9XG59XG4iXX0=