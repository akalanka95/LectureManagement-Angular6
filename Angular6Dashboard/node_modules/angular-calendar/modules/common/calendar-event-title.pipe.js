import { Pipe } from '@angular/core';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
var CalendarEventTitlePipe = /** @class */ (function () {
    function CalendarEventTitlePipe(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    CalendarEventTitlePipe.prototype.transform = function (title, titleType, event) {
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
//# sourceMappingURL=calendar-event-title.pipe.js.map