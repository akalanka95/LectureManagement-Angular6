import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import addDays from 'date-fns/add_days/index';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';
/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
var CalendarNextViewDirective = /** @class */ (function () {
    function CalendarNextViewDirective() {
        /**
           * Called when the view date is changed
           */
        this.viewDateChange = new EventEmitter();
    }
    /**
       * @hidden
       */
    CalendarNextViewDirective.prototype.onClick = /**
       * @hidden
       */
    function () {
        var addFn = {
            day: addDays,
            week: addWeeks,
            month: addMonths
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, 1));
    };
    CalendarNextViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarNextView]'
                },] },
    ];
    /** @nocollapse */
    CalendarNextViewDirective.propDecorators = {
        "view": [{ type: Input },],
        "viewDate": [{ type: Input },],
        "viewDateChange": [{ type: Output },],
        "onClick": [{ type: HostListener, args: ['click',] },],
    };
    return CalendarNextViewDirective;
}());
export { CalendarNextViewDirective };
//# sourceMappingURL=calendar-next-view.directive.js.map