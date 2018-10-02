/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The parameter type passed to the date formatter methods.
 * @record
 */
export function DateFormatterParams() { }
function DateFormatterParams_tsickle_Closure_declarations() {
    /**
     * The date to format.
     * @type {?}
     */
    DateFormatterParams.prototype.date;
    /**
     * The users preferred locale.
     * @type {?|undefined}
     */
    DateFormatterParams.prototype.locale;
}
/**
 * If using a completely custom date formatter then it should implement this interface.
 * @record
 */
export function CalendarDateFormatterInterface() { }
function CalendarDateFormatterInterface_tsickle_Closure_declarations() {
    /**
     * The month view header week day labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewColumnHeader;
    /**
     * The month view cell day number
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewDayNumber;
    /**
     * The month view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewTitle;
    /**
     * The week view header week day labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewColumnHeader;
    /**
     * The week view sub header day and month labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewColumnSubHeader;
    /**
     * The week view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewTitle;
    /**
     * The time formatting down the left hand side of the day view
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.dayViewHour;
    /**
     * The day view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.dayViewTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgcGFyYW1ldGVyIHR5cGUgcGFzc2VkIHRvIHRoZSBkYXRlIGZvcm1hdHRlciBtZXRob2RzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVGb3JtYXR0ZXJQYXJhbXMge1xuICAvKipcbiAgICogVGhlIGRhdGUgdG8gZm9ybWF0LlxuICAgKi9cbiAgZGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogVGhlIHVzZXJzIHByZWZlcnJlZCBsb2NhbGUuXG4gICAqL1xuICBsb2NhbGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSWYgdXNpbmcgYSBjb21wbGV0ZWx5IGN1c3RvbSBkYXRlIGZvcm1hdHRlciB0aGVuIGl0IHNob3VsZCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgY2VsbCBkYXkgbnVtYmVyXG4gICAqL1xuICBtb250aFZpZXdEYXlOdW1iZXIoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXG4gICAqL1xuICBtb250aFZpZXdUaXRsZSh7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBzdWIgaGVhZGVyIGRheSBhbmQgbW9udGggbGFiZWxzXG4gICAqL1xuICB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyB0aXRsZVxuICAgKi9cbiAgd2Vla1ZpZXdUaXRsZSh7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRpbWUgZm9ybWF0dGluZyBkb3duIHRoZSBsZWZ0IGhhbmQgc2lkZSBvZiB0aGUgZGF5IHZpZXdcbiAgICovXG4gIGRheVZpZXdIb3VyKHsgZGF0ZTogRGF0ZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIGRheVZpZXdUaXRsZSh7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcbn1cbiJdfQ==