import { Component, Input } from '@angular/core';
import { trackByIndex } from './util';
var CalendarEventActionsComponent = /** @class */ (function () {
    function CalendarEventActionsComponent() {
        this.trackByIndex = trackByIndex;
    }
    CalendarEventActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-event-actions',
                    template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions; trackBy:trackByIndex\"\n        (mwlClick)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarEventActionsComponent.propDecorators = {
        "event": [{ type: Input },],
    };
    return CalendarEventActionsComponent;
}());
export { CalendarEventActionsComponent };
//# sourceMappingURL=calendar-event-actions.component.js.map