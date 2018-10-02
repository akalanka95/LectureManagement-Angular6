/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import addMinutes from 'date-fns/add_minutes/index';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, trackByEventId } from '../common/util';
/**
 * @record
 */
export function CalendarDayViewBeforeRenderEvent() { }
function CalendarDayViewBeforeRenderEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.body;
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.period;
}
/**
 * @hidden
 */
var /** @type {?} */ MINUTES_IN_HOUR = 60;
/**
 * @hidden
 * @record
 */
export function DayViewEventResize() { }
function DayViewEventResize_tsickle_Closure_declarations() {
    /** @type {?} */
    DayViewEventResize.prototype.originalTop;
    /** @type {?} */
    DayViewEventResize.prototype.originalHeight;
    /** @type {?} */
    DayViewEventResize.prototype.edge;
}
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
var CalendarDayViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarDayViewComponent(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The grid size to snap resizing and dragging of events to
         */
        this.eventSnapSize = this.hourSegmentHeight;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        /**
         * @hidden
         */
        this.currentResizes = new Map();
        /**
         * @hidden
         */
        this.trackByEventId = trackByEventId;
        /**
         * @hidden
         */
        this.trackByDayEvent = function (index, dayEvent) {
            return dayEvent.event.id ? dayEvent.event.id : dayEvent.event;
        };
        /**
         * @hidden
         */
        this.trackByHour = function (index, hour) {
            return hour.segments[0].date.toISOString();
        };
        /**
         * @hidden
         */
        this.trackByHourSegment = function (index, segment) {
            return segment.date.toISOString();
        };
        this.locale = locale;
    }
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    };
    /**
     * @param {?} dropEvent
     * @param {?} segment
     * @return {?}
     */
    CalendarDayViewComponent.prototype.eventDropped = /**
     * @param {?} dropEvent
     * @param {?} segment
     * @return {?}
     */
    function (dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    };
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayViewContainer
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizeStarted = /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayViewContainer
     * @return {?}
     */
    function (event, resizeEvent, dayViewContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        var /** @type {?} */ resizeHelper = new CalendarResizeHelper(dayViewContainer);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizing = /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    function (event, resizeEvent) {
        var /** @type {?} */ currentResize = this.currentResizes.get(event);
        if (resizeEvent.edges.top) {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (resizeEvent.edges.bottom) {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    };
    /**
     * @param {?} dayEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizeEnded = /**
     * @param {?} dayEvent
     * @return {?}
     */
    function (dayEvent) {
        var /** @type {?} */ currentResize = this.currentResizes.get(dayEvent);
        var /** @type {?} */ pixelsMoved;
        if (currentResize.edge === 'top') {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        var /** @type {?} */ pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        var /** @type {?} */ minutesMoved = pixelsMoved * pixelAmountInMinutes;
        var /** @type {?} */ newStart = dayEvent.event.start;
        var /** @type {?} */ newEnd = dayEvent.event.end;
        if (currentResize.edge === 'top') {
            newStart = addMinutes(newStart, minutesMoved);
        }
        else if (newEnd) {
            newEnd = addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
        this.currentResizes.delete(dayEvent);
    };
    /**
     * @param {?} event
     * @param {?} dayViewContainer
     * @return {?}
     */
    CalendarDayViewComponent.prototype.dragStart = /**
     * @param {?} event
     * @param {?} dayViewContainer
     * @return {?}
     */
    function (event, dayViewContainer) {
        var _this = this;
        var /** @type {?} */ dragHelper = new CalendarDragHelper(dayViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    /**
     * @param {?} dayEvent
     * @param {?} draggedInPixels
     * @return {?}
     */
    CalendarDayViewComponent.prototype.eventDragged = /**
     * @param {?} dayEvent
     * @param {?} draggedInPixels
     * @return {?}
     */
    function (dayEvent, draggedInPixels) {
        var /** @type {?} */ pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        var /** @type {?} */ minutesMoved = draggedInPixels * pixelAmountInMinutes;
        var /** @type {?} */ newStart = addMinutes(dayEvent.event.start, minutesMoved);
        var /** @type {?} */ newEnd;
        if (dayEvent.event.end) {
            newEnd = addMinutes(dayEvent.event.end, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
    };
    /**
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshHourGrid = /**
     * @return {?}
     */
    function () {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        this.emitBeforeViewRender();
    };
    /**
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshView = /**
     * @return {?}
     */
    function () {
        this.view = this.utils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: this.hourSegmentHeight
        });
        this.emitBeforeViewRender();
    };
    /**
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshAll = /**
     * @return {?}
     */
    function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    /**
     * @return {?}
     */
    CalendarDayViewComponent.prototype.emitBeforeViewRender = /**
     * @return {?}
     */
    function () {
        if (this.hours && this.view) {
            this.beforeViewRender.emit({
                body: {
                    hourGrid: this.hours
                },
                period: this.view.period
            });
        }
    };
    CalendarDayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view',
                    template: "\n    <div class=\"cal-day-view\" #dayViewContainer>\n      <mwl-calendar-all-day-event\n        *ngFor=\"let event of view.allDayEvents; trackBy:trackByEventId\"\n        [event]=\"event\"\n        [customTemplate]=\"allDayEventTemplate\"\n        [eventTitleTemplate]=\"eventTitleTemplate\"\n        (eventClicked)=\"eventClicked.emit({event: event})\">\n      </mwl-calendar-all-day-event>\n      <div class=\"cal-hour-rows\">\n        <div class=\"cal-events\">\n          <div\n            #event\n            *ngFor=\"let dayEvent of view?.events; trackBy:trackByDayEvent\"\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"dayEvent.event.draggable\"\n            [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n            [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n            [ngClass]=\"dayEvent.event.cssClass\"\n            mwlResizable\n            [resizeEdges]=\"{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}\"\n            [resizeSnapGrid]=\"{top: eventSnapSize, bottom: eventSnapSize}\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"resizeStarted(dayEvent, $event, dayViewContainer)\"\n            (resizing)=\"resizing(dayEvent, $event)\"\n            (resizeEnd)=\"resizeEnded(dayEvent)\"\n            mwlDraggable\n            [dragAxis]=\"{x: false, y: dayEvent.event.draggable && currentResizes.size === 0}\"\n            [dragSnapGrid]=\"{y: eventSnapSize}\"\n            [validateDrag]=\"validateDrag\"\n            (dragPointerDown)=\"dragStart(event, dayViewContainer)\"\n            (dragEnd)=\"eventDragged(dayEvent, $event.y)\"\n            [style.marginTop.px]=\"dayEvent.top\"\n            [style.height.px]=\"dayEvent.height\"\n            [style.marginLeft.px]=\"dayEvent.left + 70\"\n            [style.width.px]=\"dayEvent.width - 1\">\n            <mwl-calendar-day-view-event\n              [dayEvent]=\"dayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              (eventClicked)=\"eventClicked.emit({event: dayEvent.event})\">\n            </mwl-calendar-day-view-event>\n          </div>\n        </div>\n        <div class=\"cal-hour\" *ngFor=\"let hour of hours; trackBy:trackByHour\" [style.minWidth.px]=\"view?.width + 70\">\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments; trackBy:trackByHourSegment\"\n            [style.height.px]=\"hourSegmentHeight\"\n            [segment]=\"segment\"\n            [segmentHeight]=\"hourSegmentHeight\"\n            [locale]=\"locale\"\n            [customTemplate]=\"hourSegmentTemplate\"\n            (click)=\"hourSegmentClicked.emit({date: segment.date})\"\n            [class.cal-drag-over]=\"segment.dragOver\"\n            mwlDroppable\n            (dragEnter)=\"segment.dragOver = true\"\n            (dragLeave)=\"segment.dragOver = false\"\n            (drop)=\"segment.dragOver = false; eventDropped($event, segment)\">\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarDayViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: CalendarUtils, },
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ]; };
    CalendarDayViewComponent.propDecorators = {
        "viewDate": [{ type: Input },],
        "events": [{ type: Input },],
        "hourSegments": [{ type: Input },],
        "hourSegmentHeight": [{ type: Input },],
        "dayStartHour": [{ type: Input },],
        "dayStartMinute": [{ type: Input },],
        "dayEndHour": [{ type: Input },],
        "dayEndMinute": [{ type: Input },],
        "eventWidth": [{ type: Input },],
        "refresh": [{ type: Input },],
        "locale": [{ type: Input },],
        "eventSnapSize": [{ type: Input },],
        "tooltipPlacement": [{ type: Input },],
        "tooltipTemplate": [{ type: Input },],
        "tooltipAppendToBody": [{ type: Input },],
        "hourSegmentTemplate": [{ type: Input },],
        "allDayEventTemplate": [{ type: Input },],
        "eventTemplate": [{ type: Input },],
        "eventTitleTemplate": [{ type: Input },],
        "eventClicked": [{ type: Output },],
        "hourSegmentClicked": [{ type: Output },],
        "eventTimesChanged": [{ type: Output },],
        "beforeViewRender": [{ type: Output },],
    };
    return CalendarDayViewComponent;
}());
export { CalendarDayViewComponent };
function CalendarDayViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarDayViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarDayViewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarDayViewComponent.propDecorators;
    /**
     * The current view date
     * @type {?}
     */
    CalendarDayViewComponent.prototype.viewDate;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     * @type {?}
     */
    CalendarDayViewComponent.prototype.events;
    /**
     * The number of segments in an hour. Must be <= 6
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegments;
    /**
     * The height in pixels of each hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentHeight;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartHour;
    /**
     * The day start minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartMinute;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndHour;
    /**
     * The day end minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndMinute;
    /**
     * The width in pixels of each event on the view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventWidth;
    /**
     * An observable that when emitted on will re-render the current view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refresh;
    /**
     * The locale used to format dates
     * @type {?}
     */
    CalendarDayViewComponent.prototype.locale;
    /**
     * The grid size to snap resizing and dragging of events to
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventSnapSize;
    /**
     * The placement of the event tooltip
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipPlacement;
    /**
     * A custom template to use for the event tooltips
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipTemplate;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipAppendToBody;
    /**
     * A custom template to use to replace the hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentTemplate;
    /**
     * A custom template to use for all day events
     * @type {?}
     */
    CalendarDayViewComponent.prototype.allDayEventTemplate;
    /**
     * A custom template to use for day view events
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTemplate;
    /**
     * A custom template to use for event titles
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTitleTemplate;
    /**
     * Called when an event title is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventClicked;
    /**
     * Called when an hour segment is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentClicked;
    /**
     * Called when an event is resized or dragged and dropped
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTimesChanged;
    /**
     * An output that will be called before the view is rendered for the current day.
     * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
     * @type {?}
     */
    CalendarDayViewComponent.prototype.beforeViewRender;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hours;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.view;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.width;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refreshSubscription;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.currentResizes;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateDrag;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateResize;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByEventId;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByDayEvent;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHour;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHourSegment;
    /** @type {?} */
    CalendarDayViewComponent.prototype.cdr;
    /** @type {?} */
    CalendarDayViewComponent.prototype.utils;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxVQUFVLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBWWhFLHFCQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrUmpDOztPQUVHO0lBQ0gsa0NBQ1UsS0FDQSxPQUNXO1FBRlgsUUFBRyxHQUFILEdBQUc7UUFDSCxVQUFLLEdBQUwsS0FBSzs7Ozs7c0JBbkxvQixFQUFFOzs7OzRCQUtMLENBQUM7Ozs7aUNBS0ksRUFBRTs7Ozs0QkFLUCxDQUFDOzs7OzhCQUtDLENBQUM7Ozs7MEJBS0wsRUFBRTs7Ozs0QkFLQSxFQUFFOzs7OzBCQUtKLEdBQUc7Ozs7NkJBZUEsSUFBSSxDQUFDLGlCQUFpQjs7OztnQ0FLbkIsS0FBSzs7OzttQ0FVRCxJQUFJOzs7OzRCQTBCN0IsSUFBSSxZQUFZLEVBRTNCOzs7O2tDQU1pQixJ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LFVBQVU7WUFDM0IsYUFBYSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Ozs7O0lBR3RCLDZDQUFVOzs7O1FBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR2IsdURBQW9COzs7O1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztnQkFDekIsSUFBSSxFQUFFO29CQUNKLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDckI7Z0JBQ0QsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTthQUN6QixDQUFDLENBQUM7U0FDSjs7O2dCQXZjSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHV3R0FpRVQ7aUJBQ0Y7Ozs7Z0JBM0hDLGlCQUFpQjtnQkFxQlYsYUFBYTtnREFxU2pCLE1BQU0sU0FBQyxTQUFTOzs7NkJBMUxsQixLQUFLOzJCQU1MLEtBQUs7aUNBS0wsS0FBSztzQ0FLTCxLQUFLO2lDQUtMLEtBQUs7bUNBS0wsS0FBSzsrQkFLTCxLQUFLO2lDQUtMLEtBQUs7K0JBS0wsS0FBSzs0QkFLTCxLQUFLOzJCQUtMLEtBQUs7a0NBS0wsS0FBSztxQ0FLTCxLQUFLO29DQUtMLEtBQUs7d0NBS0wsS0FBSzt3Q0FLTCxLQUFLO3dDQUtMLEtBQUs7a0NBS0wsS0FBSzt1Q0FLTCxLQUFLO2lDQUtMLE1BQU07dUNBUU4sTUFBTTtzQ0FRTixNQUFNO3FDQU9OLE1BQU07O21DQTdQVDs7U0FrSWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBEYXlWaWV3LFxuICBEYXlWaWV3SG91cixcbiAgRGF5Vmlld0hvdXJTZWdtZW50LFxuICBEYXlWaWV3RXZlbnQsXG4gIFZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IGFkZE1pbnV0ZXMgZnJvbSAnZGF0ZS1mbnMvYWRkX21pbnV0ZXMvaW5kZXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEcmFnSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHMsIHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50IHtcbiAgYm9keToge1xuICAgIGhvdXJHcmlkOiBEYXlWaWV3SG91cltdO1xuICB9O1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5jb25zdCBNSU5VVEVTX0lOX0hPVVI6IG51bWJlciA9IDYwO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEYXlWaWV3RXZlbnRSZXNpemUge1xuICBvcmlnaW5hbFRvcDogbnVtYmVyO1xuICBvcmlnaW5hbEhlaWdodDogbnVtYmVyO1xuICBlZGdlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIGRheS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8bXdsLWNhbGVuZGFyLWRheS12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItZGF5LXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS12aWV3XCIgI2RheVZpZXdDb250YWluZXI+XG4gICAgICA8bXdsLWNhbGVuZGFyLWFsbC1kYXktZXZlbnRcbiAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIHZpZXcuYWxsRGF5RXZlbnRzOyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImFsbERheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiBldmVudH0pXCI+XG4gICAgICA8L213bC1jYWxlbmRhci1hbGwtZGF5LWV2ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ob3VyLXJvd3NcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiB2aWV3Py5ldmVudHM7IHRyYWNrQnk6dHJhY2tCeURheUV2ZW50XCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJkYXlFdmVudC5ldmVudC5kcmFnZ2FibGVcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4tZGF5XT1cIiFkYXlFdmVudC5lbmRzQWZ0ZXJEYXlcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiZGF5RXZlbnQuZXZlbnQuY3NzQ2xhc3NcIlxuICAgICAgICAgICAgbXdsUmVzaXphYmxlXG4gICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwie3RvcDogZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQsIGJvdHRvbTogZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmR9XCJcbiAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7dG9wOiBldmVudFNuYXBTaXplLCBib3R0b206IGV2ZW50U25hcFNpemV9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAocmVzaXplU3RhcnQpPVwicmVzaXplU3RhcnRlZChkYXlFdmVudCwgJGV2ZW50LCBkYXlWaWV3Q29udGFpbmVyKVwiXG4gICAgICAgICAgICAocmVzaXppbmcpPVwicmVzaXppbmcoZGF5RXZlbnQsICRldmVudClcIlxuICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJyZXNpemVFbmRlZChkYXlFdmVudClcIlxuICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IGZhbHNlLCB5OiBkYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMH1cIlxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJ7eTogZXZlbnRTbmFwU2l6ZX1cIlxuICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxuICAgICAgICAgICAgKGRyYWdQb2ludGVyRG93bik9XCJkcmFnU3RhcnQoZXZlbnQsIGRheVZpZXdDb250YWluZXIpXCJcbiAgICAgICAgICAgIChkcmFnRW5kKT1cImV2ZW50RHJhZ2dlZChkYXlFdmVudCwgJGV2ZW50LnkpXCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5Ub3AucHhdPVwiZGF5RXZlbnQudG9wXCJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZGF5RXZlbnQuaGVpZ2h0XCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0LnB4XT1cImRheUV2ZW50LmxlZnQgKyA3MFwiXG4gICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZGF5RXZlbnQud2lkdGggLSAxXCI+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50XG4gICAgICAgICAgICAgIFtkYXlFdmVudF09XCJkYXlFdmVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IGRheUV2ZW50LmV2ZW50fSlcIj5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ob3VyXCIgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91cnM7IHRyYWNrQnk6dHJhY2tCeUhvdXJcIiBbc3R5bGUubWluV2lkdGgucHhdPVwidmlldz8ud2lkdGggKyA3MFwiPlxuICAgICAgICAgIDxtd2wtY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzOyB0cmFja0J5OnRyYWNrQnlIb3VyU2VnbWVudFwiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHtkYXRlOiBzZWdtZW50LmRhdGV9KVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWctb3Zlcl09XCJzZWdtZW50LmRyYWdPdmVyXCJcbiAgICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJzZWdtZW50LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgICAoZHJhZ0xlYXZlKT1cInNlZ21lbnQuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgICAoZHJvcCk9XCJzZWdtZW50LmRyYWdPdmVyID0gZmFsc2U7IGV2ZW50RHJvcHBlZCgkZXZlbnQsIHNlZ21lbnQpXCI+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gMzA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcblxuICAvKipcbiAgICogVGhlIHdpZHRoIGluIHBpeGVscyBvZiBlYWNoIGV2ZW50IG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBldmVudFdpZHRoOiBudW1iZXIgPSAxNTA7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGdyaWQgc2l6ZSB0byBzbmFwIHJlc2l6aW5nIGFuZCBkcmFnZ2luZyBvZiBldmVudHMgdG9cbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50U25hcFNpemU6IG51bWJlciA9IHRoaXMuaG91clNlZ21lbnRIZWlnaHQ7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGFsbCBkYXkgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRhdGU6IERhdGU7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50VGltZXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgZGF5LlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGFuIGhvdXIgZ3JpZCBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgaG91cnM6IERheVZpZXdIb3VyW10gPSBbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogRGF5VmlldztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY3VycmVudFJlc2l6ZXM6IE1hcDxEYXlWaWV3RXZlbnQsIERheVZpZXdFdmVudFJlc2l6ZT4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlRHJhZzogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVSZXNpemU6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlFdmVudElkID0gdHJhY2tCeUV2ZW50SWQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlEYXlFdmVudCA9IChpbmRleDogbnVtYmVyLCBkYXlFdmVudDogRGF5Vmlld0V2ZW50KSA9PlxuICAgIGRheUV2ZW50LmV2ZW50LmlkID8gZGF5RXZlbnQuZXZlbnQuaWQgOiBkYXlFdmVudC5ldmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSAoaW5kZXg6IG51bWJlciwgaG91cjogRGF5Vmlld0hvdXIpID0+XG4gICAgaG91ci5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IChpbmRleDogbnVtYmVyLCBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnQpID0+XG4gICAgc2VnbWVudC5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudHNcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XG4gICAgICB2YWxpZGF0ZUV2ZW50cyh0aGlzLmV2ZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50V2lkdGhcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBldmVudERyb3BwZWQoXG4gICAgZHJvcEV2ZW50OiB7IGRyb3BEYXRhPzogeyBldmVudD86IENhbGVuZGFyRXZlbnQgfSB9LFxuICAgIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudFxuICApOiB2b2lkIHtcbiAgICBpZiAoZHJvcEV2ZW50LmRyb3BEYXRhICYmIGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgZXZlbnQ6IGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCxcbiAgICAgICAgbmV3U3RhcnQ6IHNlZ21lbnQuZGF0ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzaXplU3RhcnRlZChcbiAgICBldmVudDogRGF5Vmlld0V2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCxcbiAgICBkYXlWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudFxuICApOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRSZXNpemVzLnNldChldmVudCwge1xuICAgICAgb3JpZ2luYWxUb3A6IGV2ZW50LnRvcCxcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBldmVudC5oZWlnaHQsXG4gICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJyA/ICd0b3AnIDogJ2JvdHRvbSdcbiAgICB9KTtcbiAgICBjb25zdCByZXNpemVIZWxwZXI6IENhbGVuZGFyUmVzaXplSGVscGVyID0gbmV3IENhbGVuZGFyUmVzaXplSGVscGVyKFxuICAgICAgZGF5Vmlld0NvbnRhaW5lclxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVzaXppbmcoZXZlbnQ6IERheVZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZXZlbnQpO1xuICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy50b3ApIHtcbiAgICAgIGV2ZW50LnRvcCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3AgKyArcmVzaXplRXZlbnQuZWRnZXMudG9wO1xuICAgICAgZXZlbnQuaGVpZ2h0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodCAtICtyZXNpemVFdmVudC5lZGdlcy50b3A7XG4gICAgfSBlbHNlIGlmIChyZXNpemVFdmVudC5lZGdlcy5ib3R0b20pIHtcbiAgICAgIGV2ZW50LmhlaWdodCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQgKyArcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUVuZGVkKGRheUV2ZW50OiBEYXlWaWV3RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBEYXlWaWV3RXZlbnRSZXNpemUgPSB0aGlzLmN1cnJlbnRSZXNpemVzLmdldChkYXlFdmVudCk7XG5cbiAgICBsZXQgcGl4ZWxzTW92ZWQ6IG51bWJlcjtcbiAgICBpZiAoY3VycmVudFJlc2l6ZS5lZGdlID09PSAndG9wJykge1xuICAgICAgcGl4ZWxzTW92ZWQgPSBkYXlFdmVudC50b3AgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaXhlbHNNb3ZlZCA9IGRheUV2ZW50LmhlaWdodCAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQ7XG4gICAgfVxuXG4gICAgZGF5RXZlbnQudG9wID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICBkYXlFdmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXM6IG51bWJlciA9XG4gICAgICBNSU5VVEVTX0lOX0hPVVIgLyAodGhpcy5ob3VyU2VnbWVudHMgKiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0KTtcbiAgICBjb25zdCBtaW51dGVzTW92ZWQ6IG51bWJlciA9IHBpeGVsc01vdmVkICogcGl4ZWxBbW91bnRJbk1pbnV0ZXM7XG4gICAgbGV0IG5ld1N0YXJ0OiBEYXRlID0gZGF5RXZlbnQuZXZlbnQuc3RhcnQ7XG4gICAgbGV0IG5ld0VuZDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LmVuZDtcbiAgICBpZiAoY3VycmVudFJlc2l6ZS5lZGdlID09PSAndG9wJykge1xuICAgICAgbmV3U3RhcnQgPSBhZGRNaW51dGVzKG5ld1N0YXJ0LCBtaW51dGVzTW92ZWQpO1xuICAgIH0gZWxzZSBpZiAobmV3RW5kKSB7XG4gICAgICBuZXdFbmQgPSBhZGRNaW51dGVzKG5ld0VuZCwgbWludXRlc01vdmVkKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBuZXdTdGFydCwgbmV3RW5kLCBldmVudDogZGF5RXZlbnQuZXZlbnQgfSk7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5kZWxldGUoZGF5RXZlbnQpO1xuICB9XG5cbiAgZHJhZ1N0YXJ0KGV2ZW50OiBIVE1MRWxlbWVudCwgZGF5Vmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKFxuICAgICAgZGF5Vmlld0NvbnRhaW5lcixcbiAgICAgIGV2ZW50XG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7IHgsIHkgfSkgPT5cbiAgICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJiBkcmFnSGVscGVyLnZhbGlkYXRlRHJhZyh7IHgsIHkgfSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBldmVudERyYWdnZWQoZGF5RXZlbnQ6IERheVZpZXdFdmVudCwgZHJhZ2dlZEluUGl4ZWxzOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbEFtb3VudEluTWludXRlczogbnVtYmVyID1cbiAgICAgIE1JTlVURVNfSU5fSE9VUiAvICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpO1xuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZDogbnVtYmVyID0gZHJhZ2dlZEluUGl4ZWxzICogcGl4ZWxBbW91bnRJbk1pbnV0ZXM7XG4gICAgY29uc3QgbmV3U3RhcnQ6IERhdGUgPSBhZGRNaW51dGVzKGRheUV2ZW50LmV2ZW50LnN0YXJ0LCBtaW51dGVzTW92ZWQpO1xuICAgIGxldCBuZXdFbmQ6IERhdGU7XG4gICAgaWYgKGRheUV2ZW50LmV2ZW50LmVuZCkge1xuICAgICAgbmV3RW5kID0gYWRkTWludXRlcyhkYXlFdmVudC5ldmVudC5lbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7IG5ld1N0YXJ0LCBuZXdFbmQsIGV2ZW50OiBkYXlFdmVudC5ldmVudCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhvdXJHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMuaG91cnMgPSB0aGlzLnV0aWxzLmdldERheVZpZXdIb3VyR3JpZCh7XG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy51dGlscy5nZXREYXlWaWV3KHtcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGV2ZW50V2lkdGg6IHRoaXMuZXZlbnRXaWR0aCxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IHRoaXMuaG91clNlZ21lbnRIZWlnaHRcbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhvdXJzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaG91ckdyaWQ6IHRoaXMuaG91cnNcbiAgICAgICAgfSxcbiAgICAgICAgcGVyaW9kOiB0aGlzLnZpZXcucGVyaW9kXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==