/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
export var /** @type {?} */ validateEvents = function (events) {
    var /** @type {?} */ warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, tslib_1.__spread(['angular-calendar'], args));
    };
    return validateEventsWithoutLog(events, warn);
};
/**
 * @param {?} outer
 * @param {?} inner
 * @return {?}
 */
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
export var /** @type {?} */ trackByEventId = function (index, event) {
    return event.id ? event.id : event;
};
export var /** @type {?} */ trackByWeekDayHeaderDate = function (index, day) {
    return day.date.toISOString();
};
export var /** @type {?} */ trackByIndex = function (index) { return index; };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLGNBQWMsSUFBSSx3QkFBd0IsRUFFM0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixNQUFNLENBQUMscUJBQU0sY0FBYyxHQUFHLFVBQUMsTUFBdUI7SUFDcEQscUJBQU0sSUFBSSxHQUFHO1FBQUMsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7UUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxvQkFBTSxrQkFBa0IsR0FBSyxJQUFJO0lBQXhDLENBQXlDLENBQUM7SUFDcEUsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvQyxDQUFDOzs7Ozs7QUFFRixNQUFNLG1CQUFtQixLQUFpQixFQUFFLEtBQWlCO0lBQzNELE1BQU0sQ0FBQyxDQUNMLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUk7UUFDeEIsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSztRQUN6QixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUs7UUFDMUIsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRztRQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU07UUFDekIsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUM3QixDQUFDO0NBQ0g7QUFFRCxNQUFNLENBQUMscUJBQU0sY0FBYyxHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQW9CO0lBQ2hFLE9BQUEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUEzQixDQUEyQixDQUFDO0FBRTlCLE1BQU0sQ0FBQyxxQkFBTSx3QkFBd0IsR0FBRyxVQUFDLEtBQWEsRUFBRSxHQUFZO0lBQ2xFLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFBdEIsQ0FBc0IsQ0FBQztBQUV6QixNQUFNLENBQUMscUJBQU0sWUFBWSxHQUFHLFVBQUMsS0FBYSxJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIHZhbGlkYXRlRXZlbnRzIGFzIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyxcbiAgV2Vla0RheVxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUV2ZW50cyA9IChldmVudHM6IENhbGVuZGFyRXZlbnRbXSkgPT4ge1xuICBjb25zdCB3YXJuID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUud2FybignYW5ndWxhci1jYWxlbmRhcicsIC4uLmFyZ3MpO1xuICByZXR1cm4gdmFsaWRhdGVFdmVudHNXaXRob3V0TG9nKGV2ZW50cywgd2Fybik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnNpZGUob3V0ZXI6IENsaWVudFJlY3QsIGlubmVyOiBDbGllbnRSZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgb3V0ZXIubGVmdCA8PSBpbm5lci5sZWZ0ICYmXG4gICAgaW5uZXIubGVmdCA8PSBvdXRlci5yaWdodCAmJlxuICAgIG91dGVyLmxlZnQgPD0gaW5uZXIucmlnaHQgJiZcbiAgICBpbm5lci5yaWdodCA8PSBvdXRlci5yaWdodCAmJlxuICAgIG91dGVyLnRvcCA8PSBpbm5lci50b3AgJiZcbiAgICBpbm5lci50b3AgPD0gb3V0ZXIuYm90dG9tICYmXG4gICAgb3V0ZXIudG9wIDw9IGlubmVyLmJvdHRvbSAmJlxuICAgIGlubmVyLmJvdHRvbSA8PSBvdXRlci5ib3R0b21cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlFdmVudElkID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBDYWxlbmRhckV2ZW50KSA9PlxuICBldmVudC5pZCA/IGV2ZW50LmlkIDogZXZlbnQ7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBXZWVrRGF5KSA9PlxuICBkYXkuZGF0ZS50b0lTT1N0cmluZygpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeUluZGV4ID0gKGluZGV4OiBudW1iZXIpID0+IGluZGV4O1xuIl19