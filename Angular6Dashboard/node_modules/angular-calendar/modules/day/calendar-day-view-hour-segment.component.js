import { Component, Input, TemplateRef } from '@angular/core';
var CalendarDayViewHourSegmentComponent = /** @class */ (function () {
    function CalendarDayViewHourSegmentComponent() {
    }
    CalendarDayViewHourSegmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view-hour-segment',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\">\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\">\n        <div class=\"cal-time\">\n          {{ segment.date | calendarDate:'dayViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale\n      }\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarDayViewHourSegmentComponent.propDecorators = {
        "segment": [{ type: Input },],
        "segmentHeight": [{ type: Input },],
        "locale": [{ type: Input },],
        "customTemplate": [{ type: Input },],
    };
    return CalendarDayViewHourSegmentComponent;
}());
export { CalendarDayViewHourSegmentComponent };
//# sourceMappingURL=calendar-day-view-hour-segment.component.js.map