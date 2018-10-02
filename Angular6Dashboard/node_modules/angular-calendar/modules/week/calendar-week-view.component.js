import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import addDays from 'date-fns/add_days/index';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, trackByIndex } from '../common/util';
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
var CalendarWeekViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarWeekViewComponent(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
           * An array of events to display on view
           * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
           */
        this.events = [];
        /**
           * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
           */
        this.excludeDays = [];
        /**
           * The placement of the event tooltip
           */
        this.tooltipPlacement = 'bottom';
        /**
           * Whether to append tooltips to the body or next to the trigger element
           */
        this.tooltipAppendToBody = true;
        /**
           * The precision to display events.
           * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
           */
        this.precision = 'days';
        /**
           * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
           */
        this.dayHeaderClicked = new EventEmitter();
        /**
           * Called when the event title is clicked
           */
        this.eventClicked = new EventEmitter();
        /**
           * Called when an event is resized or dragged and dropped
           */
        this.eventTimesChanged = new EventEmitter();
        /**
           * An output that will be called before the view is rendered for the current week.
           * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
           */
        this.beforeViewRender = new EventEmitter();
        /**
           * @hidden
           */
        this.currentResizes = new Map();
        /**
           * @hidden
           */
        this.trackByIndex = trackByIndex;
        /**
           * @hidden
           */
        this.trackByEventId = function (index, weekEvent) {
            return weekEvent.event.id ? weekEvent.event.id : weekEvent;
        };
        this.locale = locale;
    }
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.ngOnInit = /**
       * @hidden
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
       */
    CalendarWeekViewComponent.prototype.ngOnChanges = /**
       * @hidden
       */
    function (changes) {
        if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (changes.events || changes.viewDate || changes.excludeDays) {
            this.refreshBody();
        }
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.ngOnDestroy = /**
       * @hidden
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
       */
    CalendarWeekViewComponent.prototype.resizeStarted = /**
       * @hidden
       */
    function (weekViewContainer, weekEvent, resizeEvent) {
        this.currentResizes.set(weekEvent, {
            originalOffset: weekEvent.offset,
            originalSpan: weekEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        var resizeHelper = new CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.resizing = /**
       * @hidden
       */
    function (weekEvent, resizeEvent, dayWidth) {
        var currentResize = this.currentResizes.get(weekEvent);
        if (resizeEvent.edges.left) {
            var diff = Math.round(+resizeEvent.edges.left / dayWidth);
            weekEvent.offset = currentResize.originalOffset + diff;
            weekEvent.span = currentResize.originalSpan - diff;
        }
        else if (resizeEvent.edges.right) {
            var diff = Math.round(+resizeEvent.edges.right / dayWidth);
            weekEvent.span = currentResize.originalSpan + diff;
        }
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.resizeEnded = /**
       * @hidden
       */
    function (weekEvent) {
        var currentResize = this.currentResizes.get(weekEvent);
        var daysDiff;
        if (currentResize.edge === 'left') {
            daysDiff = weekEvent.offset - currentResize.originalOffset;
        }
        else {
            daysDiff = weekEvent.span - currentResize.originalSpan;
        }
        weekEvent.offset = currentResize.originalOffset;
        weekEvent.span = currentResize.originalSpan;
        var newStart = weekEvent.event.start;
        var newEnd = weekEvent.event.end;
        if (currentResize.edge === 'left') {
            newStart = addDays(newStart, daysDiff);
        }
        else if (newEnd) {
            newEnd = addDays(newEnd, daysDiff);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
        this.currentResizes.delete(weekEvent);
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.eventDragged = /**
       * @hidden
       */
    function (weekEvent, draggedByPx, dayWidth) {
        var daysDragged = draggedByPx / dayWidth;
        var newStart = addDays(weekEvent.event.start, daysDragged);
        var newEnd;
        if (weekEvent.event.end) {
            newEnd = addDays(weekEvent.event.end, daysDragged);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.getDayColumnWidth = /**
       * @hidden
       */
    function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    };
    /**
     * @hidden
     */
    /**
       * @hidden
       */
    CalendarWeekViewComponent.prototype.dragStart = /**
       * @hidden
       */
    function (weekViewContainer, event) {
        var _this = this;
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        var dragHelper = new CalendarDragHelper(weekViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekViewComponent.prototype.refreshHeader = function () {
        this.days = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.emitBeforeViewRender();
    };
    CalendarWeekViewComponent.prototype.refreshBody = function () {
        this.view = this.utils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true
        });
        this.emitBeforeViewRender();
    };
    CalendarWeekViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
    };
    CalendarWeekViewComponent.prototype.emitBeforeViewRender = function () {
        if (this.days && this.view) {
            this.beforeViewRender.emit({
                header: this.days,
                period: this.view.period
            });
        }
    };
    CalendarWeekViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-week-view',
                    template: "\n    <div class=\"cal-week-view\" #weekViewContainer>\n      <mwl-calendar-week-view-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n        (eventDropped)=\"eventTimesChanged.emit($event)\">\n      </mwl-calendar-week-view-header>\n      <div *ngFor=\"let eventRow of view.eventRows; trackBy:trackByIndex\" #eventRowContainer class=\"cal-events-row\">\n        <div\n          *ngFor=\"let weekEvent of eventRow.row; trackBy:trackByEventId\"\n          #event\n          class=\"cal-event-container\"\n          [class.cal-draggable]=\"weekEvent.event.draggable\"\n          [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n          [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n          [ngClass]=\"weekEvent.event?.cssClass\"\n          [style.width]=\"((100 / days.length) * weekEvent.span) + '%'\"\n          [style.marginLeft]=\"((100 / days.length) * weekEvent.offset) + '%'\"\n          mwlResizable\n          [resizeEdges]=\"{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}\"\n          [resizeSnapGrid]=\"{left: dayColumnWidth, right: dayColumnWidth}\"\n          [validateResize]=\"validateResize\"\n          (resizeStart)=\"resizeStarted(weekViewContainer, weekEvent, $event)\"\n          (resizing)=\"resizing(weekEvent, $event, dayColumnWidth)\"\n          (resizeEnd)=\"resizeEnded(weekEvent)\"\n          mwlDraggable\n          [dragAxis]=\"{x: weekEvent.event.draggable && currentResizes.size === 0, y: false}\"\n          [dragSnapGrid]=\"{x: dayColumnWidth}\"\n          [validateDrag]=\"validateDrag\"\n          (dragPointerDown)=\"dragStart(weekViewContainer, event)\"\n          (dragEnd)=\"eventDragged(weekEvent, $event.x, dayColumnWidth)\">\n          <mwl-calendar-week-view-event\n            [weekEvent]=\"weekEvent\"\n            [tooltipPlacement]=\"tooltipPlacement\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipAppendToBody]=\"tooltipAppendToBody\"\n            [customTemplate]=\"eventTemplate\"\n            [eventTitleTemplate]=\"eventTitleTemplate\"\n            (eventClicked)=\"eventClicked.emit({event: weekEvent.event})\">\n          </mwl-calendar-week-view-event>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarWeekViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: CalendarUtils, },
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ]; };
    CalendarWeekViewComponent.propDecorators = {
        "viewDate": [{ type: Input },],
        "events": [{ type: Input },],
        "excludeDays": [{ type: Input },],
        "refresh": [{ type: Input },],
        "locale": [{ type: Input },],
        "tooltipPlacement": [{ type: Input },],
        "tooltipTemplate": [{ type: Input },],
        "tooltipAppendToBody": [{ type: Input },],
        "weekStartsOn": [{ type: Input },],
        "headerTemplate": [{ type: Input },],
        "eventTemplate": [{ type: Input },],
        "eventTitleTemplate": [{ type: Input },],
        "precision": [{ type: Input },],
        "weekendDays": [{ type: Input },],
        "dayHeaderClicked": [{ type: Output },],
        "eventClicked": [{ type: Output },],
        "eventTimesChanged": [{ type: Output },],
        "beforeViewRender": [{ type: Output },],
    };
    return CalendarWeekViewComponent;
}());
export { CalendarWeekViewComponent };
//# sourceMappingURL=calendar-week-view.component.js.map