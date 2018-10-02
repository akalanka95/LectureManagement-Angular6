/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
     * @return {?}
     */
    CalendarPreviousViewDirective.prototype.onClick = /**
     * @hidden
     * @return {?}
     */
    function () {
        var /** @type {?} */ subFn = {
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
function CalendarPreviousViewDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarPreviousViewDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarPreviousViewDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarPreviousViewDirective.propDecorators;
    /**
     * The current view
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.view;
    /**
     * The current view date
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDate;
    /**
     * Called when the view date is changed
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDateChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sT0FBTyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sUUFBUSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sU0FBUyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBK0JELElBQUksWUFBWSxFQUFFOzs7Ozs7SUFNakUsK0NBQU87Ozs7O1FBQ0wscUJBQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxPQUFPO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7OztnQkE5QnJELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2lCQUN0Qzs7Ozt5QkFLRSxLQUFLOzZCQUtMLEtBQUs7bUNBS0wsTUFBTTs0QkFLTixZQUFZLFNBQUMsT0FBTzs7d0NBN0N2Qjs7U0EwQmEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBzdWJEYXlzIGZyb20gJ2RhdGUtZm5zL3N1Yl9kYXlzL2luZGV4JztcbmltcG9ydCBzdWJXZWVrcyBmcm9tICdkYXRlLWZucy9zdWJfd2Vla3MvaW5kZXgnO1xuaW1wb3J0IHN1Yk1vbnRocyBmcm9tICdkYXRlLWZucy9zdWJfbW9udGhzL2luZGV4JztcblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHZpZXcgZGF0ZSB0byB0aGUgcHJldmlvdXMgdmlldy4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPGJ1dHRvblxuICogIG13bENhbGVuZGFyUHJldmlvdXNWaWV3XG4gKiAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICogIFt2aWV3XT1cInZpZXdcIj5cbiAqICBQcmV2aW91c1xuICogPC9idXR0b24+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyUHJldmlvdXNWaWV3XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc3Qgc3ViRm46IGFueSA9IHtcbiAgICAgIGRheTogc3ViRGF5cyxcbiAgICAgIHdlZWs6IHN1YldlZWtzLFxuICAgICAgbW9udGg6IHN1Yk1vbnRoc1xuICAgIH1bdGhpcy52aWV3XTtcblxuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdWJGbih0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cbn1cbiJdfQ==