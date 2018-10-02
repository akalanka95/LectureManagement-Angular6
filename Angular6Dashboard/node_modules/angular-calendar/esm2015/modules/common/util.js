/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
export const /** @type {?} */ validateEvents = (events) => {
    const /** @type {?} */ warn = (...args) => console.warn('angular-calendar', ...args);
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
export const /** @type {?} */ trackByEventId = (index, event) => event.id ? event.id : event;
export const /** @type {?} */ trackByWeekDayHeaderDate = (index, day) => day.date.toISOString();
export const /** @type {?} */ trackByIndex = (index) => index;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsY0FBYyxJQUFJLHdCQUF3QixFQUUzQyxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE1BQU0sQ0FBQyx1QkFBTSxjQUFjLEdBQUcsQ0FBQyxNQUF1QixFQUFFLEVBQUU7SUFDeEQsdUJBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQy9DLENBQUM7Ozs7OztBQUVGLE1BQU0sbUJBQW1CLEtBQWlCLEVBQUUsS0FBaUI7SUFDM0QsTUFBTSxDQUFDLENBQ0wsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSTtRQUN4QixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUs7UUFDekIsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSztRQUMxQixLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU07UUFDekIsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTTtRQUN6QixLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQzdCLENBQUM7Q0FDSDtBQUVELE1BQU0sQ0FBQyx1QkFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBb0IsRUFBRSxFQUFFLENBQ3BFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUU5QixNQUFNLENBQUMsdUJBQU0sd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsR0FBWSxFQUFFLEVBQUUsQ0FDdEUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUV6QixNQUFNLENBQUMsdUJBQU0sWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICB2YWxpZGF0ZUV2ZW50cyBhcyB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2csXG4gIFdlZWtEYXlcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFdmVudHMgPSAoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pID0+IHtcbiAgY29uc3Qgd2FybiA9ICguLi5hcmdzKSA9PiBjb25zb2xlLndhcm4oJ2FuZ3VsYXItY2FsZW5kYXInLCAuLi5hcmdzKTtcbiAgcmV0dXJuIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyhldmVudHMsIHdhcm4pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5zaWRlKG91dGVyOiBDbGllbnRSZWN0LCBpbm5lcjogQ2xpZW50UmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG91dGVyLmxlZnQgPD0gaW5uZXIubGVmdCAmJlxuICAgIGlubmVyLmxlZnQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci5sZWZ0IDw9IGlubmVyLnJpZ2h0ICYmXG4gICAgaW5uZXIucmlnaHQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci50b3AgPD0gaW5uZXIudG9wICYmXG4gICAgaW5uZXIudG9wIDw9IG91dGVyLmJvdHRvbSAmJlxuICAgIG91dGVyLnRvcCA8PSBpbm5lci5ib3R0b20gJiZcbiAgICBpbm5lci5ib3R0b20gPD0gb3V0ZXIuYm90dG9tXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5RXZlbnRJZCA9IChpbmRleDogbnVtYmVyLCBldmVudDogQ2FsZW5kYXJFdmVudCkgPT5cbiAgZXZlbnQuaWQgPyBldmVudC5pZCA6IGV2ZW50O1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gKGluZGV4OiBudW1iZXIsIGRheTogV2Vla0RheSkgPT5cbiAgZGF5LmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlJbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiBpbmRleDtcbiJdfQ==