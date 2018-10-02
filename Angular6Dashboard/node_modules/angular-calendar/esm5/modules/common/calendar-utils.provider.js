/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { getMonthView, getWeekViewHeader, getWeekView, getDayView, getDayViewHourGrid } from 'calendar-utils';
var CalendarUtils = /** @class */ (function () {
    function CalendarUtils() {
    }
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getMonthView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getMonthView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getWeekViewHeader = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getWeekViewHeader(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getWeekView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getWeekView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getDayView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getDayView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getDayViewHourGrid = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getDayViewHourGrid(args);
    };
    CalendarUtils.decorators = [
        { type: Injectable },
    ];
    return CalendarUtils;
}());
export { CalendarUtils };
function CalendarUtils_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarUtils.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarUtils.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdXRpbHMucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLFlBQVksRUFHWixpQkFBaUIsRUFHakIsV0FBVyxFQUVYLFVBQVUsRUFHVixrQkFBa0IsRUFJbkIsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7SUFJdEIsb0NBQVk7Ozs7SUFBWixVQUFhLElBQXNCO1FBQ2pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRUQseUNBQWlCOzs7O0lBQWpCLFVBQWtCLElBQTJCO1FBQzNDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQzs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksSUFBcUI7UUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsSUFBb0I7UUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCwwQ0FBa0I7Ozs7SUFBbEIsVUFBbUIsSUFBNEI7UUFDN0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOztnQkFwQkYsVUFBVTs7d0JBbkJYOztTQW9CYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZ2V0TW9udGhWaWV3LFxuICBHZXRNb250aFZpZXdBcmdzLFxuICBNb250aFZpZXcsXG4gIGdldFdlZWtWaWV3SGVhZGVyLFxuICBHZXRXZWVrVmlld0hlYWRlckFyZ3MsXG4gIFdlZWtEYXksXG4gIGdldFdlZWtWaWV3LFxuICBHZXRXZWVrVmlld0FyZ3MsXG4gIGdldERheVZpZXcsXG4gIEdldERheVZpZXdBcmdzLFxuICBEYXlWaWV3LFxuICBnZXREYXlWaWV3SG91ckdyaWQsXG4gIEdldERheVZpZXdIb3VyR3JpZEFyZ3MsXG4gIERheVZpZXdIb3VyLFxuICBXZWVrVmlld1xufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclV0aWxzIHtcbiAgZ2V0TW9udGhWaWV3KGFyZ3M6IEdldE1vbnRoVmlld0FyZ3MpOiBNb250aFZpZXcge1xuICAgIHJldHVybiBnZXRNb250aFZpZXcoYXJncyk7XG4gIH1cblxuICBnZXRXZWVrVmlld0hlYWRlcihhcmdzOiBHZXRXZWVrVmlld0hlYWRlckFyZ3MpOiBXZWVrRGF5W10ge1xuICAgIHJldHVybiBnZXRXZWVrVmlld0hlYWRlcihhcmdzKTtcbiAgfVxuXG4gIGdldFdlZWtWaWV3KGFyZ3M6IEdldFdlZWtWaWV3QXJncyk6IFdlZWtWaWV3IHtcbiAgICByZXR1cm4gZ2V0V2Vla1ZpZXcoYXJncyk7XG4gIH1cblxuICBnZXREYXlWaWV3KGFyZ3M6IEdldERheVZpZXdBcmdzKTogRGF5VmlldyB7XG4gICAgcmV0dXJuIGdldERheVZpZXcoYXJncyk7XG4gIH1cblxuICBnZXREYXlWaWV3SG91ckdyaWQoYXJnczogR2V0RGF5Vmlld0hvdXJHcmlkQXJncyk6IERheVZpZXdIb3VyW10ge1xuICAgIHJldHVybiBnZXREYXlWaWV3SG91ckdyaWQoYXJncyk7XG4gIH1cbn1cbiJdfQ==