import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import subDays from 'date-fns/sub_days/index';
import subWeeks from 'date-fns/sub_weeks/index';
import subMonths from 'date-fns/sub_months/index';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
var CalendarPreviousViewDirective = /** @class */ (function () {
    function CalendarPreviousViewDirective() {
        /**
           * Called when the view date is changed
           */
        this.viewDateChange = new EventEmitter();
    }
    /**
       * @hidden
       */
    CalendarPreviousViewDirective.prototype.onClick = /**
       * @hidden
       */
    function () {
        var subFn = {
            day: subDays,
            week: subWeeks,
            month: subMonths
        }[this.view];
        this.viewDateChange.emit(subFn(this.viewDate, 1));
    };
    CalendarPreviousViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarPreviousView]'
                },] },
    ];
    /** @nocollapse */
    CalendarPreviousViewDirective.propDecorators = {
        "view": [{ type: Input },],
        "viewDate": [{ type: Input },],
        "viewDateChange": [{ type: Output },],
        "onClick": [{ type: HostListener, args: ['click',] },],
    };
    return CalendarPreviousViewDirective;
}());
export { CalendarPreviousViewDirective };
//# sourceMappingURL=calendar-previous-view.directive.js.map