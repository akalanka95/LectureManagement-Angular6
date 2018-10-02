/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
var CalendarEventTitlePipe = /** @class */ (function () {
    function CalendarEventTitlePipe(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    /**
     * @param {?} title
     * @param {?} titleType
     * @param {?} event
     * @return {?}
     */
    CalendarEventTitlePipe.prototype.transform = /**
     * @param {?} title
     * @param {?} titleType
     * @param {?} event
     * @return {?}
     */
    function (title, titleType, event) {
        return this.calendarEventTitle[titleType](event);
    };
    CalendarEventTitlePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'calendarEventTitle'
                },] },
    ];
    /** @nocollapse */
    CalendarEventTitlePipe.ctorParameters = function () { return [
        { type: CalendarEventTitleFormatter, },
    ]; };
    return CalendarEventTitlePipe;
}());
export { CalendarEventTitlePipe };
function CalendarEventTitlePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarEventTitlePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarEventTitlePipe.ctorParameters;
    /** @type {?} */
    CalendarEventTitlePipe.prototype.calendarEventTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aXRsZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7SUFNdEYsZ0NBQW9CLGtCQUErQztRQUEvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO0tBQUk7Ozs7Ozs7SUFFdkUsMENBQVM7Ozs7OztJQUFULFVBQVUsS0FBYSxFQUFFLFNBQWlCLEVBQUUsS0FBb0I7UUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRDs7Z0JBUkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxvQkFBb0I7aUJBQzNCOzs7O2dCQUpRLDJCQUEyQjs7aUNBRnBDOztTQU9hLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRXZlbnRUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyRXZlbnRUaXRsZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyKSB7fVxuXG4gIHRyYW5zZm9ybSh0aXRsZTogc3RyaW5nLCB0aXRsZVR5cGU6IHN0cmluZywgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyRXZlbnRUaXRsZVt0aXRsZVR5cGVdKGV2ZW50KTtcbiAgfVxufVxuIl19