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
//# sourceMappingURL=calendar-month-view-header.component.js.map