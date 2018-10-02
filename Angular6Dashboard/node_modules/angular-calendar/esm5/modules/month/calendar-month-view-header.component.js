/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
var CalendarMonthViewHeaderComponent = /** @class */ (function () {
    function CalendarMonthViewHeaderComponent() {
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
    CalendarMonthViewHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-month-view-header',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\">\n      <div class=\"cal-cell-row cal-header\">\n        <div\n          class=\"cal-cell\"\n          *ngFor=\"let day of days; trackBy:trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [ngClass]=\"day.cssClass\">\n          {{ day.date | calendarDate:'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{days: days, locale: locale}\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarMonthViewHeaderComponent.propDecorators = {
        "days": [{ type: Input },],
        "locale": [{ type: Input },],
        "customTemplate": [{ type: Input },],
    };
    return CalendarMonthViewHeaderComponent;
}());
export { CalendarMonthViewHeaderComponent };
function CalendarMonthViewHeaderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarMonthViewHeaderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarMonthViewHeaderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarMonthViewHeaderComponent.propDecorators;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.days;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.locale;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.trackByWeekDayHeaderDate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozt3Q0FtQzdCLHdCQUF3Qjs7O2dCQWpDcEQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRSw0d0JBc0JUO2lCQUNGOzs7O3lCQUVFLEtBQUs7MkJBRUwsS0FBSzttQ0FFTCxLQUFLOzsyQ0FuQ1I7O1NBOEJhLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC1yb3cgY2FsLWhlYWRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtY2VsbFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OnRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImRheS5jc3NDbGFzc1wiPlxuICAgICAgICAgIHt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOidtb250aFZpZXdDb2x1bW5IZWFkZXInOmxvY2FsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZX1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5czogV2Vla0RheVtdO1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcbn1cbiJdfQ==