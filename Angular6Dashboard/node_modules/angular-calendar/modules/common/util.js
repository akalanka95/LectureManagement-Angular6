import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
export var validateEvents = function (events) {
    var warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, ['angular-calendar'].concat(args));
    };
    return validateEventsWithoutLog(events, warn);
};
export function isInside(outer, inner) {
    return (outer.left <= inner.left &&
        inner.left <= outer.right &&
        outer.left <= inner.right &&
        inner.right <= outer.right &&
        outer.top <= inner.top &&
        inner.top <= outer.bottom &&
        outer.top <= inner.bottom &&
        inner.bottom <= outer.bottom);
}
export var trackByEventId = function (index, event) {
    return event.id ? event.id : event;
};
export var trackByWeekDayHeaderDate = function (index, day) {
    return day.date.toISOString();
};
export var trackByIndex = function (index) { return index; };
//# sourceMappingURL=util.js.map