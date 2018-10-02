/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trackByEventId } from '../common/util';
var CalendarMonthCellComponent = /** @class */ (function () {
    function CalendarMonthCellComponent() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
    CalendarMonthCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-month-cell',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-day=\"day\"\n      let-openDay=\"openDay\"\n      let-locale=\"locale\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-highlightDay=\"highlightDay\"\n      let-unhighlightDay=\"unhighlightDay\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\">\n      <div class=\"cal-cell-top\">\n        <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{ day.badgeTotal }}</span>\n        <span class=\"cal-day-number\">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>\n      </div>\n      <div class=\"cal-events\" *ngIf=\"day.events.length > 0\">\n        <div\n          class=\"cal-event\"\n          *ngFor=\"let event of day.events; trackBy:trackByEventId\"\n          [style.backgroundColor]=\"event.color?.primary\"\n          [ngClass]=\"event?.cssClass\"\n          (mouseenter)=\"highlightDay.emit({event: event})\"\n          (mouseleave)=\"unhighlightDay.emit({event: event})\"\n          [mwlCalendarTooltip]=\"event.title | calendarEventTitle:'monthTooltip':event\"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipEvent]=\"event\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          mwlDraggable\n          [dropData]=\"{event: event}\"\n          [dragAxis]=\"{x: event.draggable, y: event.draggable}\"\n          (mwlClick)=\"eventClicked.emit({ event: event })\">\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        day: day,\n        openDay: openDay,\n        locale: locale,\n        tooltipPlacement: tooltipPlacement,\n        highlightDay: highlightDay,\n        unhighlightDay: unhighlightDay,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody\n      }\">\n    </ng-template>\n  ",
                    host: {
                        class: 'cal-cell cal-day-cell',
                        '[class.cal-past]': 'day.isPast',
                        '[class.cal-today]': 'day.isToday',
                        '[class.cal-future]': 'day.isFuture',
                        '[class.cal-weekend]': 'day.isWeekend',
                        '[class.cal-in-month]': 'day.inMonth',
                        '[class.cal-out-month]': '!day.inMonth',
                        '[class.cal-has-events]': 'day.events.length > 0',
                        '[class.cal-open]': 'day === openDay',
                        '[style.backgroundColor]': 'day.backgroundColor'
                    }
                },] },
    ];
    /** @nocollapse */
    CalendarMonthCellComponent.propDecorators = {
        "day": [{ type: Input },],
        "openDay": [{ type: Input },],
        "locale": [{ type: Input },],
        "tooltipPlacement": [{ type: Input },],
        "tooltipAppendToBody": [{ type: Input },],
        "customTemplate": [{ type: Input },],
        "tooltipTemplate": [{ type: Input },],
        "highlightDay": [{ type: Output },],
        "unhighlightDay": [{ type: Output },],
        "eventClicked": [{ type: Output },],
    };
    return CalendarMonthCellComponent;
}());
export { CalendarMonthCellComponent };
function CalendarMonthCellComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarMonthCellComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarMonthCellComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarMonthCellComponent.propDecorators;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.day;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.openDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.locale;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipPlacement;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipAppendToBody;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.highlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.unhighlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.eventClicked;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.trackByEventId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7NEJBbUZGLElBQUksWUFBWSxFQUFFOzhCQUVoQixJQUFJLFlBQVksRUFBRTs0QkFHVCxJQUFJLFlBQVksRUFFbkU7OEJBRWEsY0FBYzs7O2dCQTFGaEMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSx3aEVBa0RUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsdUJBQXVCO3dCQUM5QixrQkFBa0IsRUFBRSxZQUFZO3dCQUNoQyxtQkFBbUIsRUFBRSxhQUFhO3dCQUNsQyxvQkFBb0IsRUFBRSxjQUFjO3dCQUNwQyxxQkFBcUIsRUFBRSxlQUFlO3dCQUN0QyxzQkFBc0IsRUFBRSxhQUFhO3dCQUNyQyx1QkFBdUIsRUFBRSxjQUFjO3dCQUN2Qyx3QkFBd0IsRUFBRSx1QkFBdUI7d0JBQ2pELGtCQUFrQixFQUFFLGlCQUFpQjt3QkFDckMseUJBQXlCLEVBQUUscUJBQXFCO3FCQUNqRDtpQkFDRjs7Ozt3QkFFRSxLQUFLOzRCQUVMLEtBQUs7MkJBRUwsS0FBSztxQ0FFTCxLQUFLO3dDQUVMLEtBQUs7bUNBRUwsS0FBSztvQ0FFTCxLQUFLO2lDQUVMLE1BQU07bUNBRU4sTUFBTTtpQ0FFTixNQUFNOztxQ0EvRlQ7O1NBNEVhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbnRoVmlld0RheSwgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZGF5PVwiZGF5XCJcbiAgICAgIGxldC1vcGVuRGF5PVwib3BlbkRheVwiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcbiAgICAgIGxldC10b29sdGlwUGxhY2VtZW50PVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBsZXQtaGlnaGxpZ2h0RGF5PVwiaGlnaGxpZ2h0RGF5XCJcbiAgICAgIGxldC11bmhpZ2hsaWdodERheT1cInVuaGlnaGxpZ2h0RGF5XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LWJhZGdlXCIgKm5nSWY9XCJkYXkuYmFkZ2VUb3RhbCA+IDBcIj57eyBkYXkuYmFkZ2VUb3RhbCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LW51bWJlclwiPnt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOidtb250aFZpZXdEYXlOdW1iZXInOmxvY2FsZSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIiAqbmdJZj1cImRheS5ldmVudHMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiBkYXkuZXZlbnRzOyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yPy5wcmltYXJ5XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodERheS5lbWl0KHtldmVudDogZXZlbnR9KVwiXG4gICAgICAgICAgKG1vdXNlbGVhdmUpPVwidW5oaWdobGlnaHREYXkuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIlxuICAgICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6J21vbnRoVG9vbHRpcCc6ZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgIFt0b29sdGlwRXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICBbZHJvcERhdGFdPVwie2V2ZW50OiBldmVudH1cIlxuICAgICAgICAgIFtkcmFnQXhpc109XCJ7eDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGV9XCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogZXZlbnQgfSlcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBvcGVuRGF5OiBvcGVuRGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgaGlnaGxpZ2h0RGF5OiBoaWdobGlnaHREYXksXG4gICAgICAgIHVuaGlnaGxpZ2h0RGF5OiB1bmhpZ2hsaWdodERheSxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5XG4gICAgICB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2FsLWNlbGwgY2FsLWRheS1jZWxsJyxcbiAgICAnW2NsYXNzLmNhbC1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcbiAgICAnW2NsYXNzLmNhbC10b2RheV0nOiAnZGF5LmlzVG9kYXknLFxuICAgICdbY2xhc3MuY2FsLWZ1dHVyZV0nOiAnZGF5LmlzRnV0dXJlJyxcbiAgICAnW2NsYXNzLmNhbC13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcbiAgICAnW2NsYXNzLmNhbC1pbi1tb250aF0nOiAnZGF5LmluTW9udGgnLFxuICAgICdbY2xhc3MuY2FsLW91dC1tb250aF0nOiAnIWRheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbY2xhc3MuY2FsLW9wZW5dJzogJ2RheSA9PT0gb3BlbkRheScsXG4gICAgJ1tzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdJzogJ2RheS5iYWNrZ3JvdW5kQ29sb3InXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXk6IE1vbnRoVmlld0RheTtcblxuICBASW5wdXQoKSBvcGVuRGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBoaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1bmhpZ2hsaWdodERheTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xufVxuIl19