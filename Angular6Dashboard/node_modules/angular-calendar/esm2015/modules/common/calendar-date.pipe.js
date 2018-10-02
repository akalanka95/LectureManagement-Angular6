/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
export class CalendarDatePipe {
    /**
     * @param {?} dateFormatter
     * @param {?} locale
     */
    constructor(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    /**
     * @param {?} date
     * @param {?} method
     * @param {?=} locale
     * @return {?}
     */
    transform(date, method, locale = this.locale) {
        return this.dateFormatter[method]({ date, locale });
    }
}
CalendarDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'calendarDate'
            },] },
];
/** @nocollapse */
CalendarDatePipe.ctorParameters = () => [
    { type: CalendarDateFormatter, },
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
];
function CalendarDatePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarDatePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarDatePipe.ctorParameters;
    /** @type {?} */
    CalendarDatePipe.prototype.dateFormatter;
    /** @type {?} */
    CalendarDatePipe.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7QUFZM0UsTUFBTTs7Ozs7SUFDSixZQUNVLGVBQ21CO1FBRG5CLGtCQUFhLEdBQWIsYUFBYTtRQUNNLFdBQU0sR0FBTixNQUFNO0tBQy9COzs7Ozs7O0lBRUosU0FBUyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsU0FBaUIsSUFBSSxDQUFDLE1BQU07UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNyRDs7O1lBWEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxjQUFjO2FBQ3JCOzs7O1lBWFEscUJBQXFCOzRDQWV6QixNQUFNLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIExPQ0FMRV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcblxuLyoqXG4gKiBUaGlzIHBpcGUgaXMgcHJpbWFyaWx5IGZvciByZW5kZXJpbmcgdGhlIGN1cnJlbnQgdmlldyB0aXRsZS4gRXhhbXBsZSB1c2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIHdoZXJlIGB2aWV3RGF0ZWAgaXMgYSBgRGF0ZWAgYW5kIHZpZXcgaXMgYCdtb250aCcgfCAnd2VlaycgfCAnZGF5J2BcbiAqIHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOidlbicgfX1cbiAqIGBgYFxuICovXG5AUGlwZSh7XG4gIG5hbWU6ICdjYWxlbmRhckRhdGUnXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkYXRlRm9ybWF0dGVyOiBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHRyYW5zZm9ybShkYXRlOiBEYXRlLCBtZXRob2Q6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmxvY2FsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlclttZXRob2RdKHsgZGF0ZSwgbG9jYWxlIH0pO1xuICB9XG59XG4iXX0=