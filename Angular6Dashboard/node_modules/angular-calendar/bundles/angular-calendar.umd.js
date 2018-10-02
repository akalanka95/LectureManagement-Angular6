(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('calendar-utils'), require('@angular/core'), require('@angular/common'), require('positioning'), require('date-fns/sub_days/index'), require('date-fns/sub_weeks/index'), require('date-fns/sub_months/index'), require('date-fns/add_days/index'), require('date-fns/add_weeks/index'), require('date-fns/add_months/index'), require('date-fns/start_of_today/index'), require('date-fns/get_iso_week/index'), require('angular-draggable-droppable'), require('date-fns/is_same_day/index'), require('date-fns/set_date/index'), require('date-fns/set_month/index'), require('date-fns/set_year/index'), require('date-fns/get_date/index'), require('date-fns/get_month/index'), require('date-fns/get_year/index'), require('date-fns/difference_in_seconds/index'), require('date-fns/add_seconds/index'), require('@angular/animations'), require('angular-resizable-element'), require('date-fns/add_minutes/index')) :
    typeof define === 'function' && define.amd ? define('angular-calendar', ['exports', 'tslib', 'calendar-utils', '@angular/core', '@angular/common', 'positioning', 'date-fns/sub_days/index', 'date-fns/sub_weeks/index', 'date-fns/sub_months/index', 'date-fns/add_days/index', 'date-fns/add_weeks/index', 'date-fns/add_months/index', 'date-fns/start_of_today/index', 'date-fns/get_iso_week/index', 'angular-draggable-droppable', 'date-fns/is_same_day/index', 'date-fns/set_date/index', 'date-fns/set_month/index', 'date-fns/set_year/index', 'date-fns/get_date/index', 'date-fns/get_month/index', 'date-fns/get_year/index', 'date-fns/difference_in_seconds/index', 'date-fns/add_seconds/index', '@angular/animations', 'angular-resizable-element', 'date-fns/add_minutes/index'], factory) :
    (factory((global['angular-calendar'] = {}),global.tslib,null,global.ng.core,global.ng.common,null,global.dateFns.subDays,global.dateFns.subWeeks,global.dateFns.subMonths,global.dateFns.addDays,global.dateFns.addWeeks,global.dateFns.addMonths,global.dateFns.startOfToday,global.dateFns.getIsoWeek,global['angular-draggable-droppable'],global.dateFns.isSameDay,global.dateFns.setDate,global.dateFns.setMonth,global.dateFns.setYear,global.dateFns.getDate,global.dateFns.getMonth,global.dateFns.getYear,global.dateFns.differenceInSeconds,global.dateFns.addSeconds,global.ng.animations,global['angular-resizable-element'],global.dateFns.addMinutes));
}(this, (function (exports,tslib_1,calendarUtils,core,common,positioning,subDays,subWeeks,subMonths,addDays,addWeeks,addMonths,startOfToday,getISOWeek,angularDraggableDroppable,isSameDay,setDate,setMonth,setYear,getDate,getMonth,getYear,differenceInSeconds,addSeconds,animations,angularResizableElement,addMinutes) { 'use strict';

    subDays = subDays && subDays.hasOwnProperty('default') ? subDays['default'] : subDays;
    subWeeks = subWeeks && subWeeks.hasOwnProperty('default') ? subWeeks['default'] : subWeeks;
    subMonths = subMonths && subMonths.hasOwnProperty('default') ? subMonths['default'] : subMonths;
    addDays = addDays && addDays.hasOwnProperty('default') ? addDays['default'] : addDays;
    addWeeks = addWeeks && addWeeks.hasOwnProperty('default') ? addWeeks['default'] : addWeeks;
    addMonths = addMonths && addMonths.hasOwnProperty('default') ? addMonths['default'] : addMonths;
    startOfToday = startOfToday && startOfToday.hasOwnProperty('default') ? startOfToday['default'] : startOfToday;
    getISOWeek = getISOWeek && getISOWeek.hasOwnProperty('default') ? getISOWeek['default'] : getISOWeek;
    isSameDay = isSameDay && isSameDay.hasOwnProperty('default') ? isSameDay['default'] : isSameDay;
    setDate = setDate && setDate.hasOwnProperty('default') ? setDate['default'] : setDate;
    setMonth = setMonth && setMonth.hasOwnProperty('default') ? setMonth['default'] : setMonth;
    setYear = setYear && setYear.hasOwnProperty('default') ? setYear['default'] : setYear;
    getDate = getDate && getDate.hasOwnProperty('default') ? getDate['default'] : getDate;
    getMonth = getMonth && getMonth.hasOwnProperty('default') ? getMonth['default'] : getMonth;
    getYear = getYear && getYear.hasOwnProperty('default') ? getYear['default'] : getYear;
    differenceInSeconds = differenceInSeconds && differenceInSeconds.hasOwnProperty('default') ? differenceInSeconds['default'] : differenceInSeconds;
    addSeconds = addSeconds && addSeconds.hasOwnProperty('default') ? addSeconds['default'] : addSeconds;
    addMinutes = addMinutes && addMinutes.hasOwnProperty('default') ? addMinutes['default'] : addMinutes;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ validateEvents = function (events) {
        var /** @type {?} */ warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.warn.apply(console, tslib_1.__spread(['angular-calendar'], args));
        };
        return calendarUtils.validateEvents(events, warn);
    };
    /**
     * @param {?} outer
     * @param {?} inner
     * @return {?}
     */
    function isInside(outer, inner) {
        return (outer.left <= inner.left &&
            inner.left <= outer.right &&
            outer.left <= inner.right &&
            inner.right <= outer.right &&
            outer.top <= inner.top &&
            inner.top <= outer.bottom &&
            outer.top <= inner.bottom &&
            inner.bottom <= outer.bottom);
    }
    var /** @type {?} */ trackByEventId = function (index, event) {
        return event.id ? event.id : event;
    };
    var /** @type {?} */ trackByWeekDayHeaderDate = function (index, day) {
        return day.date.toISOString();
    };
    var /** @type {?} */ trackByIndex = function (index) { return index; };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarEventActionsComponent = (function () {
        function CalendarEventActionsComponent() {
            this.trackByIndex = trackByIndex;
        }
        CalendarEventActionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-event-actions',
                        template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions; trackBy:trackByIndex\"\n        (mwlClick)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarEventActionsComponent.propDecorators = {
            "event": [{ type: core.Input },],
        };
        return CalendarEventActionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarEventTitleComponent = (function () {
        function CalendarEventTitleComponent() {
        }
        CalendarEventTitleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-event-title',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-event=\"event\"\n      let-view=\"view\">\n      <a\n        class=\"cal-event-title\"\n        href=\"javascript:;\"\n        [innerHTML]=\"event.title | calendarEventTitle:view:event\">\n      </a>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        view: view\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarEventTitleComponent.propDecorators = {
            "event": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "view": [{ type: core.Input },],
        };
        return CalendarEventTitleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarTooltipWindowComponent = (function () {
        function CalendarTooltipWindowComponent() {
        }
        CalendarTooltipWindowComponent.decorators = [
            { type: core.Component, args: [{
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\">\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarTooltipWindowComponent.propDecorators = {
            "contents": [{ type: core.Input },],
            "placement": [{ type: core.Input },],
            "event": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
        };
        return CalendarTooltipWindowComponent;
    }());
    var CalendarTooltipDirective = (function () {
        function CalendarTooltipDirective(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
        //tslint:disable-line
        ) {
            this.elementRef = elementRef;
            this.injector = injector;
            this.renderer = renderer;
            this.viewContainerRef = viewContainerRef;
            this.document //tslint:disable-line
                = document;
            this.placement = 'top';
            this.positioning = new positioning.Positioning();
            this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
        }
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.hide();
            };
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.onMouseOver = /**
         * @return {?}
         */
            function () {
                this.show();
            };
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.onMouseOut = /**
         * @return {?}
         */
            function () {
                this.hide();
            };
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.show = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.tooltipRef && this.contents) {
                    this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
                    this.tooltipRef.instance.contents = this.contents;
                    this.tooltipRef.instance.placement = this.placement;
                    this.tooltipRef.instance.customTemplate = this.customTemplate;
                    this.tooltipRef.instance.event = this.event;
                    if (this.appendToBody) {
                        this.document.body.appendChild(this.tooltipRef.location.nativeElement);
                    }
                    requestAnimationFrame(function () {
                        _this.positionTooltip();
                    });
                }
            };
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.hide = /**
         * @return {?}
         */
            function () {
                if (this.tooltipRef) {
                    this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
                    this.tooltipRef = null;
                }
            };
        /**
         * @return {?}
         */
        CalendarTooltipDirective.prototype.positionTooltip = /**
         * @return {?}
         */
            function () {
                if (this.tooltipRef) {
                    var /** @type {?} */ targetPosition = this.positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
                    var /** @type {?} */ elm = this.tooltipRef.location.nativeElement
                        .children[0];
                    this.renderer.setStyle(elm, 'top', targetPosition.top + "px");
                    this.renderer.setStyle(elm, 'left', targetPosition.left + "px");
                }
            };
        CalendarTooltipDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarTooltip]'
                    },] },
        ];
        /** @nocollapse */
        CalendarTooltipDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: core.Injector, },
                { type: core.Renderer2, },
                { type: core.ComponentFactoryResolver, },
                { type: core.ViewContainerRef, },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
            ];
        };
        CalendarTooltipDirective.propDecorators = {
            "contents": [{ type: core.Input, args: ['mwlCalendarTooltip',] },],
            "placement": [{ type: core.Input, args: ['tooltipPlacement',] },],
            "customTemplate": [{ type: core.Input, args: ['tooltipTemplate',] },],
            "event": [{ type: core.Input, args: ['tooltipEvent',] },],
            "appendToBody": [{ type: core.Input, args: ['tooltipAppendToBody',] },],
            "onMouseOver": [{ type: core.HostListener, args: ['mouseenter',] },],
            "onMouseOut": [{ type: core.HostListener, args: ['mouseleave',] },],
        };
        return CalendarTooltipDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Change the view date to the previous view. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarPreviousView
     *  [(viewDate)]="viewDate"
     *  [view]="view">
     *  Previous
     * </button>
     * ```
     */
    var CalendarPreviousViewDirective = (function () {
        function CalendarPreviousViewDirective() {
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         * @return {?}
         */
        CalendarPreviousViewDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                var /** @type {?} */ subFn = {
                    day: subDays,
                    week: subWeeks,
                    month: subMonths
                }[this.view];
                this.viewDateChange.emit(subFn(this.viewDate, 1));
            };
        CalendarPreviousViewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarPreviousView]'
                    },] },
        ];
        /** @nocollapse */
        CalendarPreviousViewDirective.propDecorators = {
            "view": [{ type: core.Input },],
            "viewDate": [{ type: core.Input },],
            "viewDateChange": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['click',] },],
        };
        return CalendarPreviousViewDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Change the view date to the next view. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarNextView
     *  [(viewDate)]="viewDate"
     *  [view]="view">
     *  Next
     * </button>
     * ```
     */
    var CalendarNextViewDirective = (function () {
        function CalendarNextViewDirective() {
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         * @return {?}
         */
        CalendarNextViewDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                var /** @type {?} */ addFn = {
                    day: addDays,
                    week: addWeeks,
                    month: addMonths
                }[this.view];
                this.viewDateChange.emit(addFn(this.viewDate, 1));
            };
        CalendarNextViewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarNextView]'
                    },] },
        ];
        /** @nocollapse */
        CalendarNextViewDirective.propDecorators = {
            "view": [{ type: core.Input },],
            "viewDate": [{ type: core.Input },],
            "viewDateChange": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['click',] },],
        };
        return CalendarNextViewDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Change the view date to the current day. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarToday
     *  [(viewDate)]="viewDate">
     *  Today
     * </button>
     * ```
     */
    var CalendarTodayDirective = (function () {
        function CalendarTodayDirective() {
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         * @return {?}
         */
        CalendarTodayDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                this.viewDateChange.emit(startOfToday());
            };
        CalendarTodayDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarToday]'
                    },] },
        ];
        /** @nocollapse */
        CalendarTodayDirective.propDecorators = {
            "viewDate": [{ type: core.Input },],
            "viewDateChange": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['click',] },],
        };
        return CalendarTodayDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
     */
    var /**
     * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
     */ CalendarAngularDateFormatter = (function () {
        function CalendarAngularDateFormatter() {
        }
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'EEEE', null, locale);
            };
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'd', null, locale);
            };
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'MMMM y', null, locale);
            };
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'EEEE', null, locale);
            };
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'MMM d', null, locale);
            };
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                var /** @type {?} */ year = new common.DatePipe(locale).transform(date, 'y', null, locale);
                var /** @type {?} */ weekNumber = getISOWeek(date);
                return "Week " + weekNumber + " of " + year;
            };
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'h a', null, locale);
            };
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new common.DatePipe(locale).transform(date, 'EEEE, MMMM d, y', null, locale);
            };
        return CalendarAngularDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
     *
     * If you wish, you may override any of the defaults via angulars DI. For example:
     *
     * ```typescript
     * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
     * import { DatePipe } from '\@angular/common';
     *
     * class CustomDateFormatter extends CalendarDateFormatter {
     *
     *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
     *     return new DatePipe(locale).transform(date, 'EEE', locale); // use short week days
     *   }
     *
     * }
     *
     * // in your component that uses the calendar
     * providers: [{
     *   provide: CalendarDateFormatter,
     *   useClass: CustomDateFormatter
     * }]
     * ```
     */
    var /**
     * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
     *
     * If you wish, you may override any of the defaults via angulars DI. For example:
     *
     * ```typescript
     * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
     * import { DatePipe } from '\@angular/common';
     *
     * class CustomDateFormatter extends CalendarDateFormatter {
     *
     *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
     *     return new DatePipe(locale).transform(date, 'EEE', locale); // use short week days
     *   }
     *
     * }
     *
     * // in your component that uses the calendar
     * providers: [{
     *   provide: CalendarDateFormatter,
     *   useClass: CustomDateFormatter
     * }]
     * ```
     */ CalendarDateFormatter = (function (_super) {
        tslib_1.__extends(CalendarDateFormatter, _super);
        function CalendarDateFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CalendarDateFormatter;
    }(CalendarAngularDateFormatter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * This pipe is primarily for rendering the current view title. Example usage:
     * ```typescript
     * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
     * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
     * ```
     */
    var CalendarDatePipe = (function () {
        function CalendarDatePipe(dateFormatter, locale) {
            this.dateFormatter = dateFormatter;
            this.locale = locale;
        }
        /**
         * @param {?} date
         * @param {?} method
         * @param {?=} locale
         * @return {?}
         */
        CalendarDatePipe.prototype.transform = /**
         * @param {?} date
         * @param {?} method
         * @param {?=} locale
         * @return {?}
         */
            function (date, method, locale) {
                if (locale === void 0) {
                    locale = this.locale;
                }
                return this.dateFormatter[method]({ date: date, locale: locale });
            };
        CalendarDatePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'calendarDate'
                    },] },
        ];
        /** @nocollapse */
        CalendarDatePipe.ctorParameters = function () {
            return [
                { type: CalendarDateFormatter, },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
            ];
        };
        return CalendarDatePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
     *
     * ```typescript
     * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
     *
     * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
     *
     *   month(event: CalendarEvent): string {
     *     return `Custom prefix: ${event.title}`;
     *   }
     *
     * }
     *
     * // in your component
     * providers: [{
     *  provide: CalendarEventTitleFormatter,
     *  useClass: CustomEventTitleFormatter
     * }]
     * ```
     */
    var /**
     * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
     *
     * ```typescript
     * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
     *
     * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
     *
     *   month(event: CalendarEvent): string {
     *     return `Custom prefix: ${event.title}`;
     *   }
     *
     * }
     *
     * // in your component
     * providers: [{
     *  provide: CalendarEventTitleFormatter,
     *  useClass: CustomEventTitleFormatter
     * }]
     * ```
     */ CalendarEventTitleFormatter = (function () {
        function CalendarEventTitleFormatter() {
        }
        /**
         * The month view event title.
         */
        /**
         * The month view event title.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.month = /**
         * The month view event title.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.monthTooltip = /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        /**
         * The week view event title.
         */
        /**
         * The week view event title.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.week = /**
         * The week view event title.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.weekTooltip = /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        /**
         * The day view event title.
         */
        /**
         * The day view event title.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.day = /**
         * The day view event title.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.dayTooltip = /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @return {?}
         */
            function (event) {
                return event.title;
            };
        return CalendarEventTitleFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarEventTitlePipe = (function () {
        function CalendarEventTitlePipe(calendarEventTitle) {
            this.calendarEventTitle = calendarEventTitle;
        }
        /**
         * @param {?} title
         * @param {?} titleType
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitlePipe.prototype.transform = /**
         * @param {?} title
         * @param {?} titleType
         * @param {?} event
         * @return {?}
         */
            function (title, titleType, event) {
                return this.calendarEventTitle[titleType](event);
            };
        CalendarEventTitlePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'calendarEventTitle'
                    },] },
        ];
        /** @nocollapse */
        CalendarEventTitlePipe.ctorParameters = function () {
            return [
                { type: CalendarEventTitleFormatter, },
            ];
        };
        return CalendarEventTitlePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ClickDirective = (function () {
        function ClickDirective(renderer, elm) {
            this.renderer = renderer;
            this.elm = elm;
            this.click = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        ClickDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var /** @type {?} */ eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
                    ? 'tap'
                    : 'click';
                this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, function (event) {
                    _this.click.next(event);
                });
            };
        /**
         * @return {?}
         */
        ClickDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.removeListener();
            };
        ClickDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlClick]'
                    },] },
        ];
        /** @nocollapse */
        ClickDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2, },
                { type: core.ElementRef, },
            ];
        };
        ClickDirective.propDecorators = {
            "click": [{ type: core.Output, args: ['mwlClick',] },],
        };
        return ClickDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarUtils = (function () {
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
                return calendarUtils.getMonthView(args);
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
                return calendarUtils.getWeekViewHeader(args);
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
                return calendarUtils.getWeekView(args);
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
                return calendarUtils.getDayView(args);
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
                return calendarUtils.getDayViewHourGrid(args);
            };
        CalendarUtils.decorators = [
            { type: core.Injectable },
        ];
        return CalendarUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ MOMENT = new core.InjectionToken('Moment');
    /**
     * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
     *
     * ```typescript
     * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
     * import moment from 'moment';
     *
     * // in your component
     * provide: [{
     *   provide: MOMENT, useValue: moment
     * }, {
     *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
     * }]
     *
     * ```
     */
    var CalendarMomentDateFormatter = (function () {
        /**
         * @hidden
         */
        function CalendarMomentDateFormatter(moment) {
            this.moment = moment;
        }
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd');
            };
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('D');
            };
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('MMMM YYYY');
            };
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd');
            };
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('D MMM');
            };
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('[Week] W [of] YYYY');
            };
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('ha');
            };
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd, D MMMM, YYYY');
            };
        /** @nocollapse */
        CalendarMomentDateFormatter.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [MOMENT,] },] },
            ];
        };
        return CalendarMomentDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
     *
     * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
     */
    var /**
     * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
     *
     * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
     */ CalendarNativeDateFormatter = (function () {
        function CalendarNativeDateFormatter() {
        }
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
            };
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
            };
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    year: 'numeric',
                    month: 'long'
                }).format(date);
            };
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
            };
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    day: 'numeric',
                    month: 'short'
                }).format(date);
            };
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                var /** @type {?} */ year = new Intl.DateTimeFormat(locale, {
                    year: 'numeric'
                }).format(date);
                var /** @type {?} */ weekNumber = getISOWeek(date);
                return "Week " + weekNumber + " of " + year;
            };
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
            };
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long'
                }).format(date);
            };
        return CalendarNativeDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
     *
     * ```typescript
     * import { CalendarCommonModule } from 'angular-calendar/modules/common';
     * import { CalendarMonthModule } from 'angular-calendar/modules/month';
     *
     * \@NgModule({
     *   imports: [
     *     CalendarCommonModule.forRoot(),
     *     CalendarMonthModule
     *   ]
     * })
     * class MyModule {}
     * ```
     *
     */
    var CalendarCommonModule = (function () {
        function CalendarCommonModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        CalendarCommonModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: CalendarCommonModule,
                    providers: [
                        angularDraggableDroppable.DraggableHelper,
                        config.eventTitleFormatter || CalendarEventTitleFormatter,
                        config.dateFormatter || CalendarDateFormatter,
                        config.utils || CalendarUtils
                    ]
                };
            };
        CalendarCommonModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            CalendarEventActionsComponent,
                            CalendarEventTitleComponent,
                            CalendarTooltipWindowComponent,
                            CalendarTooltipDirective,
                            CalendarPreviousViewDirective,
                            CalendarNextViewDirective,
                            CalendarTodayDirective,
                            CalendarDatePipe,
                            CalendarEventTitlePipe,
                            ClickDirective
                        ],
                        imports: [common.CommonModule],
                        exports: [
                            CalendarEventActionsComponent,
                            CalendarEventTitleComponent,
                            CalendarTooltipWindowComponent,
                            CalendarTooltipDirective,
                            CalendarPreviousViewDirective,
                            CalendarNextViewDirective,
                            CalendarTodayDirective,
                            CalendarDatePipe,
                            CalendarEventTitlePipe,
                            ClickDirective
                        ],
                        entryComponents: [CalendarTooltipWindowComponent]
                    },] },
        ];
        return CalendarCommonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Shows all events on a given month. Example usage:
     *
     * ```typescript
     * <mwl-calendar-month-view
     *  [viewDate]="viewDate"
     *  [events]="events">
     * </mwl-calendar-month-view>
     * ```
     */
    var CalendarMonthViewComponent = (function () {
        /**
         * @hidden
         */
        function CalendarMonthViewComponent(cdr, utils, locale) {
            this.cdr = cdr;
            this.utils = utils;
            /**
             * An array of events to display on view.
             * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
             */
            this.events = [];
            /**
             * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
             */
            this.excludeDays = [];
            /**
             * Whether the events list for the day of the `viewDate` option is visible or not
             */
            this.activeDayIsOpen = false;
            /**
             * The placement of the event tooltip
             */
            this.tooltipPlacement = 'top';
            /**
             * Whether to append tooltips to the body or next to the trigger element
             */
            this.tooltipAppendToBody = true;
            /**
             * An output that will be called before the view is rendered for the current month.
             * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
             */
            this.beforeViewRender = new core.EventEmitter();
            /**
             * Called when the day cell is clicked
             */
            this.dayClicked = new core.EventEmitter();
            /**
             * Called when the event title is clicked
             */
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when an event is dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * @hidden
             */
            this.trackByIndex = trackByIndex;
            /**
             * @hidden
             */
            this.trackByDate = function (index, day) { return day.date.toISOString(); };
            this.locale = locale;
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnInit = /**
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
         * @param {?} changes
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnChanges = /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
                    this.refreshHeader();
                }
                if (changes.events) {
                    validateEvents(this.events);
                }
                if (changes.viewDate ||
                    changes.events ||
                    changes.excludeDays ||
                    changes.weekendDays) {
                    this.refreshBody();
                }
                if (changes.activeDayIsOpen ||
                    changes.viewDate ||
                    changes.events ||
                    changes.excludeDays) {
                    this.checkActiveDayIsOpen();
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnDestroy = /**
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
         * @param {?} event
         * @param {?} isHighlighted
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.toggleDayHighlight = /**
         * @hidden
         * @param {?} event
         * @param {?} isHighlighted
         * @return {?}
         */
            function (event, isHighlighted) {
                this.view.days.forEach(function (day) {
                    if (isHighlighted && day.events.indexOf(event) > -1) {
                        day.backgroundColor =
                            (event.color && event.color.secondary) || '#D1E8FF';
                    }
                    else {
                        delete day.backgroundColor;
                    }
                });
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} day
         * @param {?} event
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.eventDropped = /**
         * @hidden
         * @param {?} day
         * @param {?} event
         * @return {?}
         */
            function (day, event) {
                var /** @type {?} */ year = getYear(day.date);
                var /** @type {?} */ month = getMonth(day.date);
                var /** @type {?} */ date = getDate(day.date);
                var /** @type {?} */ newStart = setDate(setMonth(setYear(event.start, year), month), date);
                var /** @type {?} */ newEnd;
                if (event.end) {
                    var /** @type {?} */ secondsDiff = differenceInSeconds(newStart, event.start);
                    newEnd = addSeconds(event.end, secondsDiff);
                }
                this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd, day: day });
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} clickEvent
         * @param {?} day
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.handleDayClick = /**
         * @hidden
         * @param {?} clickEvent
         * @param {?} day
         * @return {?}
         */
            function (clickEvent, day) {
                // when using hammerjs, stopPropagation doesn't work. See https://github.com/mattlewis92/angular-calendar/issues/318
                if (!clickEvent.target.classList.contains('cal-event')) {
                    this.dayClicked.emit({ day: day });
                }
            };
        /**
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshHeader = /**
         * @return {?}
         */
            function () {
                this.columnHeaders = this.utils.getWeekViewHeader({
                    viewDate: this.viewDate,
                    weekStartsOn: this.weekStartsOn,
                    excluded: this.excludeDays,
                    weekendDays: this.weekendDays
                });
                this.emitBeforeViewRender();
            };
        /**
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshBody = /**
         * @return {?}
         */
            function () {
                this.view = this.utils.getMonthView({
                    events: this.events,
                    viewDate: this.viewDate,
                    weekStartsOn: this.weekStartsOn,
                    excluded: this.excludeDays,
                    weekendDays: this.weekendDays
                });
                this.emitBeforeViewRender();
            };
        /**
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.activeDayIsOpen === true) {
                    this.openDay = this.view.days.find(function (day) {
                        return isSameDay(day.date, _this.viewDate);
                    });
                    var /** @type {?} */ index = this.view.days.indexOf(this.openDay);
                    this.openRowIndex =
                        Math.floor(index / this.view.totalDaysVisibleInWeek) *
                            this.view.totalDaysVisibleInWeek;
                }
                else {
                    this.openRowIndex = null;
                    this.openDay = null;
                }
            };
        /**
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshAll = /**
         * @return {?}
         */
            function () {
                this.columnHeaders = null;
                this.view = null;
                this.refreshHeader();
                this.refreshBody();
                this.checkActiveDayIsOpen();
            };
        /**
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.emitBeforeViewRender = /**
         * @return {?}
         */
            function () {
                if (this.columnHeaders && this.view) {
                    this.beforeViewRender.emit({
                        header: this.columnHeaders,
                        body: this.view.days,
                        period: this.view.period
                    });
                }
            };
        CalendarMonthViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-month-view',
                        template: "\n    <div class=\"cal-month-view\">\n      <mwl-calendar-month-view-header\n        [days]=\"columnHeaders\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\">\n      </mwl-calendar-month-view-header>\n      <div class=\"cal-days\">\n        <div *ngFor=\"let rowIndex of view.rowOffsets; trackByIndex\">\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"let day of (view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)); trackBy:trackByDate\"\n              [class.cal-drag-over]=\"day.dragOver\"\n              [ngClass]=\"day?.cssClass\"\n              [day]=\"day\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [customTemplate]=\"cellTemplate\"\n              (click)=\"handleDayClick($event, day)\"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              (dragEnter)=\"day.dragOver = true\"\n              (dragLeave)=\"day.dragOver = false\"\n              (drop)=\"day.dragOver = false; eventDropped(day, $event.dropData.event)\"\n              (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            [customTemplate]=\"openDayEventsTemplate\"\n            [eventTitleTemplate]=\"eventTitleTemplate\"\n            (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarMonthViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
                { type: CalendarUtils, },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
            ];
        };
        CalendarMonthViewComponent.propDecorators = {
            "viewDate": [{ type: core.Input },],
            "events": [{ type: core.Input },],
            "excludeDays": [{ type: core.Input },],
            "activeDayIsOpen": [{ type: core.Input },],
            "refresh": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "weekStartsOn": [{ type: core.Input },],
            "headerTemplate": [{ type: core.Input },],
            "cellTemplate": [{ type: core.Input },],
            "openDayEventsTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "weekendDays": [{ type: core.Input },],
            "beforeViewRender": [{ type: core.Output },],
            "dayClicked": [{ type: core.Output },],
            "eventClicked": [{ type: core.Output },],
            "eventTimesChanged": [{ type: core.Output },],
        };
        return CalendarMonthViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarMonthViewHeaderComponent = (function () {
        function CalendarMonthViewHeaderComponent() {
            this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        }
        CalendarMonthViewHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-month-view-header',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\">\n      <div class=\"cal-cell-row cal-header\">\n        <div\n          class=\"cal-cell\"\n          *ngFor=\"let day of days; trackBy:trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [ngClass]=\"day.cssClass\">\n          {{ day.date | calendarDate:'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{days: days, locale: locale}\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarMonthViewHeaderComponent.propDecorators = {
            "days": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
        };
        return CalendarMonthViewHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarMonthCellComponent = (function () {
        function CalendarMonthCellComponent() {
            this.highlightDay = new core.EventEmitter();
            this.unhighlightDay = new core.EventEmitter();
            this.eventClicked = new core.EventEmitter();
            this.trackByEventId = trackByEventId;
        }
        CalendarMonthCellComponent.decorators = [
            { type: core.Component, args: [{
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
            "day": [{ type: core.Input },],
            "openDay": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "highlightDay": [{ type: core.Output },],
            "unhighlightDay": [{ type: core.Output },],
            "eventClicked": [{ type: core.Output },],
        };
        return CalendarMonthCellComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarOpenDayEventsComponent = (function () {
        function CalendarOpenDayEventsComponent() {
            this.isOpen = false;
            this.eventClicked = new core.EventEmitter();
            this.trackByEventId = trackByEventId;
        }
        CalendarOpenDayEventsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-open-day-events',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-events=\"events\"\n      let-eventClicked=\"eventClicked\">\n      <div\n        *ngFor=\"let event of events; trackBy:trackByEventId\"\n        [ngClass]=\"event?.cssClass\"\n        mwlDraggable\n        [dropData]=\"{event: event}\"\n        [dragAxis]=\"{x: event.draggable, y: event.draggable}\">\n        <span\n          class=\"cal-event\"\n          [style.backgroundColor]=\"event.color?.primary\">\n        </span>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"month\"\n          (mwlClick)=\"eventClicked.emit({event: event})\">\n        </mwl-calendar-event-title>\n        &ngsp;\n        <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n      </div>\n    </ng-template>\n    <div class=\"cal-open-day-events\" [@collapse] *ngIf=\"isOpen\">\n      <ng-template\n        [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{\n          events: events,\n          eventClicked: eventClicked\n        }\">\n      </ng-template>\n    </div>\n  ",
                        animations: [
                            animations.trigger('collapse', [
                                animations.transition('void => *', [
                                    animations.style({ height: 0, overflow: 'hidden' }),
                                    animations.animate('150ms', animations.style({ height: '*' }))
                                ]),
                                animations.transition('* => void', [
                                    animations.style({ height: '*', overflow: 'hidden' }),
                                    animations.animate('150ms', animations.style({ height: 0 }))
                                ])
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        CalendarOpenDayEventsComponent.propDecorators = {
            "isOpen": [{ type: core.Input },],
            "events": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "eventClicked": [{ type: core.Output },],
        };
        return CalendarOpenDayEventsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarMonthModule = (function () {
        function CalendarMonthModule() {
        }
        CalendarMonthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, angularDraggableDroppable.DragAndDropModule, CalendarCommonModule],
                        declarations: [
                            CalendarMonthViewComponent,
                            CalendarMonthCellComponent,
                            CalendarOpenDayEventsComponent,
                            CalendarMonthViewHeaderComponent
                        ],
                        exports: [
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarMonthViewComponent,
                            CalendarMonthCellComponent,
                            CalendarOpenDayEventsComponent,
                            CalendarMonthViewHeaderComponent
                        ]
                    },] },
        ];
        return CalendarMonthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarDragHelper = (function () {
        function CalendarDragHelper(dragContainerElement, draggableElement) {
            this.dragContainerElement = dragContainerElement;
            this.startPosition = draggableElement.getBoundingClientRect();
        }
        /**
         * @param {?} __0
         * @return {?}
         */
        CalendarDragHelper.prototype.validateDrag = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var x = _a.x, y = _a.y;
                var /** @type {?} */ newRect = Object.assign({}, this.startPosition, {
                    left: this.startPosition.left + x,
                    right: this.startPosition.right + x,
                    top: this.startPosition.top + y,
                    bottom: this.startPosition.bottom + y
                });
                return isInside(this.dragContainerElement.getBoundingClientRect(), newRect);
            };
        return CalendarDragHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarResizeHelper = (function () {
        function CalendarResizeHelper(resizeContainerElement, minWidth) {
            this.resizeContainerElement = resizeContainerElement;
            this.minWidth = minWidth;
        }
        /**
         * @param {?} __0
         * @return {?}
         */
        CalendarResizeHelper.prototype.validateResize = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var rectangle = _a.rectangle;
                if (this.minWidth && rectangle.width < this.minWidth) {
                    return false;
                }
                return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
            };
        return CalendarResizeHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
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
    var CalendarWeekViewComponent = (function () {
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
            this.dayHeaderClicked = new core.EventEmitter();
            /**
             * Called when the event title is clicked
             */
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when an event is resized or dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * An output that will be called before the view is rendered for the current week.
             * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
             */
            this.beforeViewRender = new core.EventEmitter();
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
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnInit = /**
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
         * @param {?} changes
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnChanges = /**
         * @hidden
         * @param {?} changes
         * @return {?}
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
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnDestroy = /**
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
         * @param {?} weekViewContainer
         * @param {?} weekEvent
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.resizeStarted = /**
         * @hidden
         * @param {?} weekViewContainer
         * @param {?} weekEvent
         * @param {?} resizeEvent
         * @return {?}
         */
            function (weekViewContainer, weekEvent, resizeEvent) {
                this.currentResizes.set(weekEvent, {
                    originalOffset: weekEvent.offset,
                    originalSpan: weekEvent.span,
                    edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
                });
                this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
                var /** @type {?} */ resizeHelper = new CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
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
         * @param {?} weekEvent
         * @param {?} resizeEvent
         * @param {?} dayWidth
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.resizing = /**
         * @hidden
         * @param {?} weekEvent
         * @param {?} resizeEvent
         * @param {?} dayWidth
         * @return {?}
         */
            function (weekEvent, resizeEvent, dayWidth) {
                var /** @type {?} */ currentResize = this.currentResizes.get(weekEvent);
                if (resizeEvent.edges.left) {
                    var /** @type {?} */ diff = Math.round(+resizeEvent.edges.left / dayWidth);
                    weekEvent.offset = currentResize.originalOffset + diff;
                    weekEvent.span = currentResize.originalSpan - diff;
                }
                else if (resizeEvent.edges.right) {
                    var /** @type {?} */ diff = Math.round(+resizeEvent.edges.right / dayWidth);
                    weekEvent.span = currentResize.originalSpan + diff;
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} weekEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.resizeEnded = /**
         * @hidden
         * @param {?} weekEvent
         * @return {?}
         */
            function (weekEvent) {
                var /** @type {?} */ currentResize = this.currentResizes.get(weekEvent);
                var /** @type {?} */ daysDiff;
                if (currentResize.edge === 'left') {
                    daysDiff = weekEvent.offset - currentResize.originalOffset;
                }
                else {
                    daysDiff = weekEvent.span - currentResize.originalSpan;
                }
                weekEvent.offset = currentResize.originalOffset;
                weekEvent.span = currentResize.originalSpan;
                var /** @type {?} */ newStart = weekEvent.event.start;
                var /** @type {?} */ newEnd = weekEvent.event.end;
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
         * @param {?} weekEvent
         * @param {?} draggedByPx
         * @param {?} dayWidth
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.eventDragged = /**
         * @hidden
         * @param {?} weekEvent
         * @param {?} draggedByPx
         * @param {?} dayWidth
         * @return {?}
         */
            function (weekEvent, draggedByPx, dayWidth) {
                var /** @type {?} */ daysDragged = draggedByPx / dayWidth;
                var /** @type {?} */ newStart = addDays(weekEvent.event.start, daysDragged);
                var /** @type {?} */ newEnd;
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
         * @param {?} eventRowContainer
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.getDayColumnWidth = /**
         * @hidden
         * @param {?} eventRowContainer
         * @return {?}
         */
            function (eventRowContainer) {
                return Math.floor(eventRowContainer.offsetWidth / this.days.length);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} weekViewContainer
         * @param {?} event
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.dragStart = /**
         * @hidden
         * @param {?} weekViewContainer
         * @param {?} event
         * @return {?}
         */
            function (weekViewContainer, event) {
                var _this = this;
                this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
                var /** @type {?} */ dragHelper = new CalendarDragHelper(weekViewContainer, event);
                this.validateDrag = function (_a) {
                    var x = _a.x, y = _a.y;
                    return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
                };
                this.cdr.markForCheck();
            };
        /**
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshHeader = /**
         * @return {?}
         */
            function () {
                this.days = this.utils.getWeekViewHeader({
                    viewDate: this.viewDate,
                    weekStartsOn: this.weekStartsOn,
                    excluded: this.excludeDays,
                    weekendDays: this.weekendDays
                });
                this.emitBeforeViewRender();
            };
        /**
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshBody = /**
         * @return {?}
         */
            function () {
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
        /**
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshAll = /**
         * @return {?}
         */
            function () {
                this.refreshHeader();
                this.refreshBody();
            };
        /**
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.emitBeforeViewRender = /**
         * @return {?}
         */
            function () {
                if (this.days && this.view) {
                    this.beforeViewRender.emit({
                        header: this.days,
                        period: this.view.period
                    });
                }
            };
        CalendarWeekViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view',
                        template: "\n    <div class=\"cal-week-view\" #weekViewContainer>\n      <mwl-calendar-week-view-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n        (eventDropped)=\"eventTimesChanged.emit($event)\">\n      </mwl-calendar-week-view-header>\n      <div *ngFor=\"let eventRow of view.eventRows; trackBy:trackByIndex\" #eventRowContainer class=\"cal-events-row\">\n        <div\n          *ngFor=\"let weekEvent of eventRow.row; trackBy:trackByEventId\"\n          #event\n          class=\"cal-event-container\"\n          [class.cal-draggable]=\"weekEvent.event.draggable\"\n          [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n          [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n          [ngClass]=\"weekEvent.event?.cssClass\"\n          [style.width]=\"((100 / days.length) * weekEvent.span) + '%'\"\n          [style.marginLeft]=\"((100 / days.length) * weekEvent.offset) + '%'\"\n          mwlResizable\n          [resizeEdges]=\"{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}\"\n          [resizeSnapGrid]=\"{left: dayColumnWidth, right: dayColumnWidth}\"\n          [validateResize]=\"validateResize\"\n          (resizeStart)=\"resizeStarted(weekViewContainer, weekEvent, $event)\"\n          (resizing)=\"resizing(weekEvent, $event, dayColumnWidth)\"\n          (resizeEnd)=\"resizeEnded(weekEvent)\"\n          mwlDraggable\n          [dragAxis]=\"{x: weekEvent.event.draggable && currentResizes.size === 0, y: false}\"\n          [dragSnapGrid]=\"{x: dayColumnWidth}\"\n          [validateDrag]=\"validateDrag\"\n          (dragPointerDown)=\"dragStart(weekViewContainer, event)\"\n          (dragEnd)=\"eventDragged(weekEvent, $event.x, dayColumnWidth)\">\n          <mwl-calendar-week-view-event\n            [weekEvent]=\"weekEvent\"\n            [tooltipPlacement]=\"tooltipPlacement\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipAppendToBody]=\"tooltipAppendToBody\"\n            [customTemplate]=\"eventTemplate\"\n            [eventTitleTemplate]=\"eventTitleTemplate\"\n            (eventClicked)=\"eventClicked.emit({event: weekEvent.event})\">\n          </mwl-calendar-week-view-event>\n        </div>\n      </div>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarWeekViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
                { type: CalendarUtils, },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
            ];
        };
        CalendarWeekViewComponent.propDecorators = {
            "viewDate": [{ type: core.Input },],
            "events": [{ type: core.Input },],
            "excludeDays": [{ type: core.Input },],
            "refresh": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "weekStartsOn": [{ type: core.Input },],
            "headerTemplate": [{ type: core.Input },],
            "eventTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "precision": [{ type: core.Input },],
            "weekendDays": [{ type: core.Input },],
            "dayHeaderClicked": [{ type: core.Output },],
            "eventClicked": [{ type: core.Output },],
            "eventTimesChanged": [{ type: core.Output },],
            "beforeViewRender": [{ type: core.Output },],
        };
        return CalendarWeekViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarWeekViewHeaderComponent = (function () {
        function CalendarWeekViewHeaderComponent() {
            this.dayHeaderClicked = new core.EventEmitter();
            this.eventDropped = new core.EventEmitter();
            this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        }
        CalendarWeekViewHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view-header',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-dayHeaderClicked=\"dayHeaderClicked\"\n      let-eventDropped=\"eventDropped\">\n      <div class=\"cal-day-headers\">\n        <div\n          class=\"cal-header\"\n          *ngFor=\"let day of days; trackBy:trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [class.cal-drag-over]=\"day.dragOver\"\n          [ngClass]=\"day.cssClass\"\n          (mwlClick)=\"dayHeaderClicked.emit({day: day})\"\n          mwlDroppable\n          (dragEnter)=\"day.dragOver = true\"\n          (dragLeave)=\"day.dragOver = false\"\n          (drop)=\"day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})\">\n          <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>\n          <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{days: days, locale: locale, dayHeaderClicked: dayHeaderClicked, eventDropped: eventDropped}\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarWeekViewHeaderComponent.propDecorators = {
            "days": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "dayHeaderClicked": [{ type: core.Output },],
            "eventDropped": [{ type: core.Output },],
        };
        return CalendarWeekViewHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarWeekViewEventComponent = (function () {
        function CalendarWeekViewEventComponent() {
            this.eventClicked = new core.EventEmitter();
        }
        CalendarWeekViewEventComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view-event',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\">\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"weekEvent.event.color?.secondary\"\n        [style.borderColor]=\"weekEvent.event.color?.primary\"\n        [mwlCalendarTooltip]=\"weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event\"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\">\n        <mwl-calendar-event-actions [event]=\"weekEvent.event\"></mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"week\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarWeekViewEventComponent.propDecorators = {
            "weekEvent": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "eventClicked": [{ type: core.Output },],
        };
        return CalendarWeekViewEventComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarWeekModule = (function () {
        function CalendarWeekModule() {
        }
        CalendarWeekModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarCommonModule
                        ],
                        declarations: [
                            CalendarWeekViewComponent,
                            CalendarWeekViewHeaderComponent,
                            CalendarWeekViewEventComponent
                        ],
                        exports: [
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarWeekViewComponent,
                            CalendarWeekViewHeaderComponent,
                            CalendarWeekViewEventComponent
                        ]
                    },] },
        ];
        return CalendarWeekModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @hidden
     */
    var /** @type {?} */ MINUTES_IN_HOUR = 60;
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
    var CalendarDayViewComponent = (function () {
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
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when an hour segment is clicked
             */
            this.hourSegmentClicked = new core.EventEmitter();
            /**
             * Called when an event is resized or dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * An output that will be called before the view is rendered for the current day.
             * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
             */
            this.beforeViewRender = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view',
                        template: "\n    <div class=\"cal-day-view\" #dayViewContainer>\n      <mwl-calendar-all-day-event\n        *ngFor=\"let event of view.allDayEvents; trackBy:trackByEventId\"\n        [event]=\"event\"\n        [customTemplate]=\"allDayEventTemplate\"\n        [eventTitleTemplate]=\"eventTitleTemplate\"\n        (eventClicked)=\"eventClicked.emit({event: event})\">\n      </mwl-calendar-all-day-event>\n      <div class=\"cal-hour-rows\">\n        <div class=\"cal-events\">\n          <div\n            #event\n            *ngFor=\"let dayEvent of view?.events; trackBy:trackByDayEvent\"\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"dayEvent.event.draggable\"\n            [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n            [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n            [ngClass]=\"dayEvent.event.cssClass\"\n            mwlResizable\n            [resizeEdges]=\"{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}\"\n            [resizeSnapGrid]=\"{top: eventSnapSize, bottom: eventSnapSize}\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"resizeStarted(dayEvent, $event, dayViewContainer)\"\n            (resizing)=\"resizing(dayEvent, $event)\"\n            (resizeEnd)=\"resizeEnded(dayEvent)\"\n            mwlDraggable\n            [dragAxis]=\"{x: false, y: dayEvent.event.draggable && currentResizes.size === 0}\"\n            [dragSnapGrid]=\"{y: eventSnapSize}\"\n            [validateDrag]=\"validateDrag\"\n            (dragPointerDown)=\"dragStart(event, dayViewContainer)\"\n            (dragEnd)=\"eventDragged(dayEvent, $event.y)\"\n            [style.marginTop.px]=\"dayEvent.top\"\n            [style.height.px]=\"dayEvent.height\"\n            [style.marginLeft.px]=\"dayEvent.left + 70\"\n            [style.width.px]=\"dayEvent.width - 1\">\n            <mwl-calendar-day-view-event\n              [dayEvent]=\"dayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              (eventClicked)=\"eventClicked.emit({event: dayEvent.event})\">\n            </mwl-calendar-day-view-event>\n          </div>\n        </div>\n        <div class=\"cal-hour\" *ngFor=\"let hour of hours; trackBy:trackByHour\" [style.minWidth.px]=\"view?.width + 70\">\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments; trackBy:trackByHourSegment\"\n            [style.height.px]=\"hourSegmentHeight\"\n            [segment]=\"segment\"\n            [segmentHeight]=\"hourSegmentHeight\"\n            [locale]=\"locale\"\n            [customTemplate]=\"hourSegmentTemplate\"\n            (click)=\"hourSegmentClicked.emit({date: segment.date})\"\n            [class.cal-drag-over]=\"segment.dragOver\"\n            mwlDroppable\n            (dragEnter)=\"segment.dragOver = true\"\n            (dragLeave)=\"segment.dragOver = false\"\n            (drop)=\"segment.dragOver = false; eventDropped($event, segment)\">\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarDayViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
                { type: CalendarUtils, },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
            ];
        };
        CalendarDayViewComponent.propDecorators = {
            "viewDate": [{ type: core.Input },],
            "events": [{ type: core.Input },],
            "hourSegments": [{ type: core.Input },],
            "hourSegmentHeight": [{ type: core.Input },],
            "dayStartHour": [{ type: core.Input },],
            "dayStartMinute": [{ type: core.Input },],
            "dayEndHour": [{ type: core.Input },],
            "dayEndMinute": [{ type: core.Input },],
            "eventWidth": [{ type: core.Input },],
            "refresh": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "eventSnapSize": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "hourSegmentTemplate": [{ type: core.Input },],
            "allDayEventTemplate": [{ type: core.Input },],
            "eventTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "eventClicked": [{ type: core.Output },],
            "hourSegmentClicked": [{ type: core.Output },],
            "eventTimesChanged": [{ type: core.Output },],
            "beforeViewRender": [{ type: core.Output },],
        };
        return CalendarDayViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarAllDayEventComponent = (function () {
        function CalendarAllDayEventComponent() {
            this.eventClicked = new core.EventEmitter();
        }
        CalendarAllDayEventComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-all-day-event',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-event=\"event\"\n      let-eventClicked=\"eventClicked\">\n      <div\n        class=\"cal-all-day-event\"\n        [style.backgroundColor]=\"event.color?.secondary\"\n        [style.borderColor]=\"event.color?.primary\">\n        <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"day\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        eventClicked: eventClicked\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarAllDayEventComponent.propDecorators = {
            "event": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "eventClicked": [{ type: core.Output },],
        };
        return CalendarAllDayEventComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarDayViewHourSegmentComponent = (function () {
        function CalendarDayViewHourSegmentComponent() {
        }
        CalendarDayViewHourSegmentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view-hour-segment',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\">\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\">\n        <div class=\"cal-time\">\n          {{ segment.date | calendarDate:'dayViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarDayViewHourSegmentComponent.propDecorators = {
            "segment": [{ type: core.Input },],
            "segmentHeight": [{ type: core.Input },],
            "locale": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
        };
        return CalendarDayViewHourSegmentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarDayViewEventComponent = (function () {
        function CalendarDayViewEventComponent() {
            this.eventClicked = new core.EventEmitter();
        }
        CalendarDayViewEventComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view-event',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-dayEvent=\"dayEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\">\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"dayEvent.event.color?.secondary\"\n        [style.borderColor]=\"dayEvent.event.color?.primary\"\n        [mwlCalendarTooltip]=\"dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event\"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"dayEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\">\n        <mwl-calendar-event-actions [event]=\"dayEvent.event\"></mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"dayEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"day\"\n          (mwlClick)=\"eventClicked.emit()\">\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        dayEvent: dayEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody\n      }\">\n    </ng-template>\n  "
                    },] },
        ];
        /** @nocollapse */
        CalendarDayViewEventComponent.propDecorators = {
            "dayEvent": [{ type: core.Input },],
            "tooltipPlacement": [{ type: core.Input },],
            "tooltipAppendToBody": [{ type: core.Input },],
            "customTemplate": [{ type: core.Input },],
            "eventTitleTemplate": [{ type: core.Input },],
            "tooltipTemplate": [{ type: core.Input },],
            "eventClicked": [{ type: core.Output },],
        };
        return CalendarDayViewEventComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CalendarDayModule = (function () {
        function CalendarDayModule() {
        }
        CalendarDayModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarCommonModule
                        ],
                        declarations: [
                            CalendarDayViewComponent,
                            CalendarAllDayEventComponent,
                            CalendarDayViewHourSegmentComponent,
                            CalendarDayViewEventComponent
                        ],
                        exports: [
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarDayViewComponent,
                            CalendarAllDayEventComponent,
                            CalendarDayViewHourSegmentComponent,
                            CalendarDayViewEventComponent
                        ]
                    },] },
        ];
        return CalendarDayModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * The main module of this library. Example usage:
     *
     * ```typescript
     * import { CalenderModule } from 'angular-calendar';
     *
     * \@NgModule({
     *   imports: [
     *     CalenderModule.forRoot()
     *   ]
     * })
     * class MyModule {}
     * ```
     *
     */
    var CalendarModule = (function () {
        function CalendarModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        CalendarModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: CalendarModule,
                    providers: [
                        angularDraggableDroppable.DraggableHelper,
                        config.eventTitleFormatter || CalendarEventTitleFormatter,
                        config.dateFormatter || CalendarDateFormatter,
                        config.utils || CalendarUtils
                    ]
                };
            };
        CalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            CalendarCommonModule,
                            CalendarMonthModule,
                            CalendarWeekModule,
                            CalendarDayModule
                        ],
                        exports: [
                            CalendarCommonModule,
                            CalendarMonthModule,
                            CalendarWeekModule,
                            CalendarDayModule
                        ]
                    },] },
        ];
        return CalendarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DAYS_OF_WEEK = calendarUtils.DAYS_OF_WEEK;
    exports.CalendarModule = CalendarModule;
    exports.CalendarCommonModule = CalendarCommonModule;
    exports.CalendarEventTitleFormatter = CalendarEventTitleFormatter;
    exports.MOMENT = MOMENT;
    exports.CalendarMomentDateFormatter = CalendarMomentDateFormatter;
    exports.CalendarNativeDateFormatter = CalendarNativeDateFormatter;
    exports.CalendarAngularDateFormatter = CalendarAngularDateFormatter;
    exports.CalendarDateFormatter = CalendarDateFormatter;
    exports.CalendarUtils = CalendarUtils;
    exports.CalendarMonthViewComponent = CalendarMonthViewComponent;
    exports.CalendarMonthModule = CalendarMonthModule;
    exports.CalendarWeekViewComponent = CalendarWeekViewComponent;
    exports.CalendarWeekModule = CalendarWeekModule;
    exports.CalendarDayViewComponent = CalendarDayViewComponent;
    exports.CalendarDayModule = CalendarDayModule;
    exports.ɵh = CalendarDatePipe;
    exports.ɵa = CalendarEventActionsComponent;
    exports.ɵb = CalendarEventTitleComponent;
    exports.ɵi = CalendarEventTitlePipe;
    exports.ɵf = CalendarNextViewDirective;
    exports.ɵe = CalendarPreviousViewDirective;
    exports.ɵg = CalendarTodayDirective;
    exports.ɵd = CalendarTooltipDirective;
    exports.ɵc = CalendarTooltipWindowComponent;
    exports.ɵj = ClickDirective;
    exports.ɵp = CalendarAllDayEventComponent;
    exports.ɵr = CalendarDayViewEventComponent;
    exports.ɵq = CalendarDayViewHourSegmentComponent;
    exports.ɵk = CalendarMonthCellComponent;
    exports.ɵm = CalendarMonthViewHeaderComponent;
    exports.ɵl = CalendarOpenDayEventsComponent;
    exports.ɵo = CalendarWeekViewEventComponent;
    exports.ɵn = CalendarWeekViewHeaderComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jYWxlbmRhci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vdXRpbC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci10b2RheS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1kYXRlLnBpcGUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLnBpcGUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2xpY2suZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLW1vbWVudC1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1uYXRpdmUtZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL21vbnRoL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9tb250aC9jYWxlbmRhci1vcGVuLWRheS1ldmVudHMuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXIudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2RheS9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9kYXkvY2FsZW5kYXItYWxsLWRheS1ldmVudC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9kYXkvY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2RheS9jYWxlbmRhci1kYXktdmlldy1ldmVudC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9kYXkvY2FsZW5kYXItZGF5Lm1vZHVsZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NhbGVuZGFyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICB2YWxpZGF0ZUV2ZW50cyBhcyB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2csXG4gIFdlZWtEYXlcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFdmVudHMgPSAoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pID0+IHtcbiAgY29uc3Qgd2FybiA9ICguLi5hcmdzKSA9PiBjb25zb2xlLndhcm4oJ2FuZ3VsYXItY2FsZW5kYXInLCAuLi5hcmdzKTtcbiAgcmV0dXJuIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyhldmVudHMsIHdhcm4pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5zaWRlKG91dGVyOiBDbGllbnRSZWN0LCBpbm5lcjogQ2xpZW50UmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG91dGVyLmxlZnQgPD0gaW5uZXIubGVmdCAmJlxuICAgIGlubmVyLmxlZnQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci5sZWZ0IDw9IGlubmVyLnJpZ2h0ICYmXG4gICAgaW5uZXIucmlnaHQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci50b3AgPD0gaW5uZXIudG9wICYmXG4gICAgaW5uZXIudG9wIDw9IG91dGVyLmJvdHRvbSAmJlxuICAgIG91dGVyLnRvcCA8PSBpbm5lci5ib3R0b20gJiZcbiAgICBpbm5lci5ib3R0b20gPD0gb3V0ZXIuYm90dG9tXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5RXZlbnRJZCA9IChpbmRleDogbnVtYmVyLCBldmVudDogQ2FsZW5kYXJFdmVudCkgPT5cbiAgZXZlbnQuaWQgPyBldmVudC5pZCA6IGV2ZW50O1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gKGluZGV4OiBudW1iZXIsIGRheTogV2Vla0RheSkgPT5cbiAgZGF5LmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlJbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiBpbmRleDtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5SW5kZXggfSBmcm9tICcuL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gKm5nSWY9XCJldmVudC5hY3Rpb25zXCIgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uc1wiPlxuICAgICAgPGFcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgZXZlbnQuYWN0aW9uczsgdHJhY2tCeTp0cmFja0J5SW5kZXhcIlxuICAgICAgICAobXdsQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soe2V2ZW50OiBldmVudH0pXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiYWN0aW9uLmNzc0NsYXNzXCJcbiAgICAgICAgW2lubmVySHRtbF09XCJhY3Rpb24ubGFiZWxcIj5cbiAgICAgIDwvYT5cbiAgICA8L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgdHJhY2tCeUluZGV4ID0gdHJhY2tCeUluZGV4O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1ldmVudC10aXRsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXG4gICAgICBsZXQtdmlldz1cInZpZXdcIj5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6dmlldzpldmVudFwiPlxuICAgICAgPC9hPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB2aWV3OiB2aWV3XG4gICAgICB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQge1xuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdG9yLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIEluamVjdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nIH0gZnJvbSAncG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtY29udGVudHM9XCJjb250ZW50c1wiXG4gICAgICBsZXQtcGxhY2VtZW50PVwicGxhY2VtZW50XCJcbiAgICAgIGxldC1ldmVudD1cImV2ZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXBcIiBbbmdDbGFzc109XCInY2FsLXRvb2x0aXAtJyArIHBsYWNlbWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXAtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10b29sdGlwLWlubmVyXCIgW2lubmVySHRtbF09XCJjb250ZW50c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBjb250ZW50czogY29udGVudHMsXG4gICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgICBldmVudDogZXZlbnRcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbnRlbnRzOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclRvb2x0aXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ213bENhbGVuZGFyVG9vbHRpcCcpIGNvbnRlbnRzOiBzdHJpbmc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwUGxhY2VtZW50JykgcGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBUZW1wbGF0ZScpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcEV2ZW50JykgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwQXBwZW5kVG9Cb2R5JykgYXBwZW5kVG9Cb2R5OiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIHByaXZhdGUgdG9vbHRpcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBwb3NpdGlvbmluZzogUG9zaXRpb25pbmcgPSBuZXcgUG9zaXRpb25pbmcoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50IC8vdHNsaW50OmRpc2FibGUtbGluZVxuICApIHtcbiAgICB0aGlzLnRvb2x0aXBGYWN0b3J5ID0gY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VPdmVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VPdXQoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIHNob3coKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRvb2x0aXBSZWYgJiYgdGhpcy5jb250ZW50cykge1xuICAgICAgdGhpcy50b29sdGlwUmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy50b29sdGlwRmFjdG9yeSxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5pbmplY3RvcixcbiAgICAgICAgW11cbiAgICAgICk7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLnBsYWNlbWVudCA9IHRoaXMucGxhY2VtZW50O1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmN1c3RvbVRlbXBsYXRlID0gdGhpcy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5ldmVudCA9IHRoaXMuZXZlbnQ7XG4gICAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucG9zaXRpb25Ub29sdGlwKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcFJlZikge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZShcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy50b29sdGlwUmVmLmhvc3RWaWV3KVxuICAgICAgKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcFJlZikge1xuICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb246IENsaWVudFJlY3QgPSB0aGlzLnBvc2l0aW9uaW5nLnBvc2l0aW9uRWxlbWVudHMoXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSxcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5XG4gICAgICApO1xuXG4gICAgICBjb25zdCBlbG06IEhUTUxFbGVtZW50ID0gdGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgLmNoaWxkcmVuWzBdO1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsbSwgJ3RvcCcsIGAke3RhcmdldFBvc2l0aW9uLnRvcH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbG0sICdsZWZ0JywgYCR7dGFyZ2V0UG9zaXRpb24ubGVmdH1weGApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBzdWJEYXlzIGZyb20gJ2RhdGUtZm5zL3N1Yl9kYXlzL2luZGV4JztcbmltcG9ydCBzdWJXZWVrcyBmcm9tICdkYXRlLWZucy9zdWJfd2Vla3MvaW5kZXgnO1xuaW1wb3J0IHN1Yk1vbnRocyBmcm9tICdkYXRlLWZucy9zdWJfbW9udGhzL2luZGV4JztcblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHZpZXcgZGF0ZSB0byB0aGUgcHJldmlvdXMgdmlldy4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPGJ1dHRvblxuICogIG13bENhbGVuZGFyUHJldmlvdXNWaWV3XG4gKiAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICogIFt2aWV3XT1cInZpZXdcIj5cbiAqICBQcmV2aW91c1xuICogPC9idXR0b24+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyUHJldmlvdXNWaWV3XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc3Qgc3ViRm46IGFueSA9IHtcbiAgICAgIGRheTogc3ViRGF5cyxcbiAgICAgIHdlZWs6IHN1YldlZWtzLFxuICAgICAgbW9udGg6IHN1Yk1vbnRoc1xuICAgIH1bdGhpcy52aWV3XTtcblxuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdWJGbih0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgYWRkRGF5cyBmcm9tICdkYXRlLWZucy9hZGRfZGF5cy9pbmRleCc7XG5pbXBvcnQgYWRkV2Vla3MgZnJvbSAnZGF0ZS1mbnMvYWRkX3dlZWtzL2luZGV4JztcbmltcG9ydCBhZGRNb250aHMgZnJvbSAnZGF0ZS1mbnMvYWRkX21vbnRocy9pbmRleCc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIG5leHQgdmlldy4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPGJ1dHRvblxuICogIG13bENhbGVuZGFyTmV4dFZpZXdcbiAqICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiXG4gKiAgW3ZpZXddPVwidmlld1wiPlxuICogIE5leHRcbiAqIDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhck5leHRWaWV3XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJOZXh0Vmlld0RpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGRhdGUgaXMgY2hhbmdlZFxuICAgKi9cbiAgQE91dHB1dCgpIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBjb25zdCBhZGRGbjogYW55ID0ge1xuICAgICAgZGF5OiBhZGREYXlzLFxuICAgICAgd2VlazogYWRkV2Vla3MsXG4gICAgICBtb250aDogYWRkTW9udGhzXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIDEpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBzdGFydE9mVG9kYXkgZnJvbSAnZGF0ZS1mbnMvc3RhcnRfb2ZfdG9kYXkvaW5kZXgnO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBjdXJyZW50IGRheS4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPGJ1dHRvblxuICogIG13bENhbGVuZGFyVG9kYXlcbiAqICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiPlxuICogIFRvZGF5XG4gKiA8L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJUb2RheV0nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdGFydE9mVG9kYXkoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSxcbiAgRGF0ZUZvcm1hdHRlclBhcmFtc1xufSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLmludGVyZmFjZSc7XG5pbXBvcnQgZ2V0SVNPV2VlayBmcm9tICdkYXRlLWZucy9nZXRfaXNvX3dlZWsvaW5kZXgnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgd2lsbCB1c2UgdGhlIGFuZ3VsYXIgZGF0ZSBwaXBlIHRvIGRvIGFsbCBkYXRlIGZvcm1hdHRpbmcuIEl0IGlzIHRoZSBkZWZhdWx0IGRhdGUgZm9ybWF0dGVyIHVzZWQgYnkgdGhlIGNhbGVuZGFyLlxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlclxuICBpbXBsZW1lbnRzIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3Q29sdW1uSGVhZGVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ0VFRUUnLCBudWxsLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGNlbGwgZGF5IG51bWJlclxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0RheU51bWJlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IERhdGVQaXBlKGxvY2FsZSkudHJhbnNmb3JtKGRhdGUsICdkJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ01NTU0geScsIG51bGwsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnRUVFRScsIG51bGwsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBzdWIgaGVhZGVyIGRheSBhbmQgbW9udGggbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdDb2x1bW5TdWJIZWFkZXIoe1xuICAgIGRhdGUsXG4gICAgbG9jYWxlXG4gIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ01NTSBkJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICBjb25zdCB5ZWFyOiBzdHJpbmcgPSBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oXG4gICAgICBkYXRlLFxuICAgICAgJ3knLFxuICAgICAgbnVsbCxcbiAgICAgIGxvY2FsZVxuICAgICk7XG4gICAgY29uc3Qgd2Vla051bWJlcjogbnVtYmVyID0gZ2V0SVNPV2VlayhkYXRlKTtcbiAgICByZXR1cm4gYFdlZWsgJHt3ZWVrTnVtYmVyfSBvZiAke3llYXJ9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSBkYXkgdmlld1xuICAgKi9cbiAgcHVibGljIGRheVZpZXdIb3VyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ2ggYScsIG51bGwsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRheSB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgZGF5Vmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oXG4gICAgICBkYXRlLFxuICAgICAgJ0VFRUUsIE1NTU0gZCwgeScsXG4gICAgICBudWxsLFxuICAgICAgbG9jYWxlXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgYWxsIGZvcm1hdHRpbmcgb2YgZGF0ZXMuIFRoZXJlIGFyZSAzIGltcGxlbWVudGF0aW9ucyBhdmFpbGFibGUsIHRoZSBgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlcmAgKGRlZmF1bHQpIHdoaWNoIHVzZXMgdGhlIGFuZ3VsYXIgZGF0ZSBwaXBlIHRvIGZvcm1hdCBkYXRlcywgdGhlIGBDYWxlbmRhck5hdGl2ZURhdGVGb3JtYXR0ZXJgIHdoaWNoIHdpbGwgdXNlIHRoZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bFwiIHRhcmdldD1cIl9ibGFua1wiPkludGw8L2E+IEFQSSB0byBmb3JtYXQgZGF0ZXMsIG9yIHRoZXJlIGlzIHRoZSBgQ2FsZW5kYXJNb21lbnREYXRlRm9ybWF0dGVyYCB3aGljaCB1c2VzIDxhIGhyZWY9XCJodHRwOi8vbW9tZW50anMuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPm1vbWVudDwvYT4uXG4gKlxuICogSWYgeW91IHdpc2gsIHlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIHRoZSBkZWZhdWx0cyB2aWEgYW5ndWxhcnMgREkuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgRGF0ZUZvcm1hdHRlclBhcmFtcyB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICogaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuICpcbiAqIGNsYXNzIEN1c3RvbURhdGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIge1xuICpcbiAqICAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7ZGF0ZSwgbG9jYWxlfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnRUVFJywgbG9jYWxlKTsgLy8gdXNlIHNob3J0IHdlZWsgZGF5c1xuICogICB9XG4gKlxuICogfVxuICpcbiAqIC8vIGluIHlvdXIgY29tcG9uZW50IHRoYXQgdXNlcyB0aGUgY2FsZW5kYXJcbiAqIHByb3ZpZGVyczogW3tcbiAqICAgcHJvdmlkZTogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICogICB1c2VDbGFzczogQ3VzdG9tRGF0ZUZvcm1hdHRlclxuICogfV1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIGV4dGVuZHMgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB7fVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgTE9DQUxFX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuXG4vKipcbiAqIFRoaXMgcGlwZSBpcyBwcmltYXJpbHkgZm9yIHJlbmRlcmluZyB0aGUgY3VycmVudCB2aWV3IHRpdGxlLiBFeGFtcGxlIHVzYWdlOlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gd2hlcmUgYHZpZXdEYXRlYCBpcyBhIGBEYXRlYCBhbmQgdmlldyBpcyBgJ21vbnRoJyB8ICd3ZWVrJyB8ICdkYXknYFxuICoge3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6J2VuJyB9fVxuICogYGBgXG4gKi9cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRGF0ZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRhdGVGb3JtYXR0ZXI6IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZ1xuICApIHt9XG5cbiAgdHJhbnNmb3JtKGRhdGU6IERhdGUsIG1ldGhvZDogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyA9IHRoaXMubG9jYWxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyW21ldGhvZF0oeyBkYXRlLCBsb2NhbGUgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyBhbGwgZXZlbnQgdGl0bGVzIHdpdGhpbiB0aGUgY2FsZW5kYXIuIFlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIGl0cyBtZXRob2RzIHZpYSBhbmd1bGFycyBESSB0byBzdWl0IHlvdXIgcmVxdWlyZW1lbnRzLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsIENhbGVuZGFyRXZlbnQgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqXG4gKiBjbGFzcyBDdXN0b21FdmVudFRpdGxlRm9ybWF0dGVyIGV4dGVuZHMgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIHtcbiAqXG4gKiAgIG1vbnRoKGV2ZW50OiBDYWxlbmRhckV2ZW50KTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gYEN1c3RvbSBwcmVmaXg6ICR7ZXZlbnQudGl0bGV9YDtcbiAqICAgfVxuICpcbiAqIH1cbiAqXG4gKiAvLyBpbiB5b3VyIGNvbXBvbmVudFxuICogcHJvdmlkZXJzOiBbe1xuICogIHByb3ZpZGU6IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAqICB1c2VDbGFzczogQ3VzdG9tRXZlbnRUaXRsZUZvcm1hdHRlclxuICogfV1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGV2ZW50IHRpdGxlLlxuICAgKi9cbiAgbW9udGgoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBtb250aFRvb2x0aXAoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGV2ZW50IHRpdGxlLlxuICAgKi9cbiAgd2VlayhldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgZXZlbnQgdG9vbHRpcC4gUmV0dXJuIGEgZmFsc2V5IHZhbHVlIGZyb20gdGhpcyB0byBkaXNhYmxlIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgd2Vla1Rvb2x0aXAoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgZXZlbnQgdGl0bGUuXG4gICAqL1xuICBkYXkoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBldmVudC50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgZXZlbnQgdG9vbHRpcC4gUmV0dXJuIGEgZmFsc2V5IHZhbHVlIGZyb20gdGhpcyB0byBkaXNhYmxlIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgZGF5VG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aXRsZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjYWxlbmRhckV2ZW50VGl0bGUnXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRUaXRsZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhckV2ZW50VGl0bGU6IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcikge31cblxuICB0cmFuc2Zvcm0odGl0bGU6IHN0cmluZywgdGl0bGVUeXBlOiBzdHJpbmcsIGV2ZW50OiBDYWxlbmRhckV2ZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jYWxlbmRhckV2ZW50VGl0bGVbdGl0bGVUeXBlXShldmVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDbGlja10nXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCdtd2xDbGljaycpIGNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBwcml2YXRlIHJlbW92ZUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnROYW1lOiBzdHJpbmcgPVxuICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvd1snSGFtbWVyJ10gIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gJ3RhcCdcbiAgICAgICAgOiAnY2xpY2snO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBldmVudE5hbWUsXG4gICAgICBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuY2xpY2submV4dChldmVudCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZ2V0TW9udGhWaWV3LFxuICBHZXRNb250aFZpZXdBcmdzLFxuICBNb250aFZpZXcsXG4gIGdldFdlZWtWaWV3SGVhZGVyLFxuICBHZXRXZWVrVmlld0hlYWRlckFyZ3MsXG4gIFdlZWtEYXksXG4gIGdldFdlZWtWaWV3LFxuICBHZXRXZWVrVmlld0FyZ3MsXG4gIGdldERheVZpZXcsXG4gIEdldERheVZpZXdBcmdzLFxuICBEYXlWaWV3LFxuICBnZXREYXlWaWV3SG91ckdyaWQsXG4gIEdldERheVZpZXdIb3VyR3JpZEFyZ3MsXG4gIERheVZpZXdIb3VyLFxuICBXZWVrVmlld1xufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclV0aWxzIHtcbiAgZ2V0TW9udGhWaWV3KGFyZ3M6IEdldE1vbnRoVmlld0FyZ3MpOiBNb250aFZpZXcge1xuICAgIHJldHVybiBnZXRNb250aFZpZXcoYXJncyk7XG4gIH1cblxuICBnZXRXZWVrVmlld0hlYWRlcihhcmdzOiBHZXRXZWVrVmlld0hlYWRlckFyZ3MpOiBXZWVrRGF5W10ge1xuICAgIHJldHVybiBnZXRXZWVrVmlld0hlYWRlcihhcmdzKTtcbiAgfVxuXG4gIGdldFdlZWtWaWV3KGFyZ3M6IEdldFdlZWtWaWV3QXJncyk6IFdlZWtWaWV3IHtcbiAgICByZXR1cm4gZ2V0V2Vla1ZpZXcoYXJncyk7XG4gIH1cblxuICBnZXREYXlWaWV3KGFyZ3M6IEdldERheVZpZXdBcmdzKTogRGF5VmlldyB7XG4gICAgcmV0dXJuIGdldERheVZpZXcoYXJncyk7XG4gIH1cblxuICBnZXREYXlWaWV3SG91ckdyaWQoYXJnczogR2V0RGF5Vmlld0hvdXJHcmlkQXJncyk6IERheVZpZXdIb3VyW10ge1xuICAgIHJldHVybiBnZXREYXlWaWV3SG91ckdyaWQoYXJncyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGlvblRva2VuLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSxcbiAgRGF0ZUZvcm1hdHRlclBhcmFtc1xufSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBNT01FTlQ6IEluamVjdGlvblRva2VuPHN0cmluZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01vbWVudCcpO1xuXG4vKipcbiAqIFRoaXMgd2lsbCB1c2UgPGEgaHJlZj1cImh0dHA6Ly9tb21lbnRqcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bW9tZW50PC9hPiB0byBkbyBhbGwgZGF0ZSBmb3JtYXR0aW5nLiBUbyB1c2UgdGhpcyBjbGFzczpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsIENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlciwgTU9NRU5UIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XG4gKiBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4gKlxuICogLy8gaW4geW91ciBjb21wb25lbnRcbiAqIHByb3ZpZGU6IFt7XG4gKiAgIHByb3ZpZGU6IE1PTUVOVCwgdXNlVmFsdWU6IG1vbWVudFxuICogfSwge1xuICogICBwcm92aWRlOiBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsIHVzZUNsYXNzOiBDYWxlbmRhck1vbWVudERhdGVGb3JtYXR0ZXJcbiAqIH1dXG4gKlxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbWVudERhdGVGb3JtYXR0ZXJcbiAgaW1wbGVtZW50cyBDYWxlbmRhckRhdGVGb3JtYXR0ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoQEluamVjdChNT01FTlQpIHByaXZhdGUgbW9tZW50OiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXG4gICAgICAubG9jYWxlKGxvY2FsZSlcbiAgICAgIC5mb3JtYXQoJ2RkZGQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBjZWxsIGRheSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdEYXlOdW1iZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXG4gICAgICAubG9jYWxlKGxvY2FsZSlcbiAgICAgIC5mb3JtYXQoJ0QnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxuICAgICAgLmxvY2FsZShsb2NhbGUpXG4gICAgICAuZm9ybWF0KCdNTU1NIFlZWVknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnZGRkZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgc3ViIGhlYWRlciBkYXkgYW5kIG1vbnRoIGxhYmVsc1xuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uU3ViSGVhZGVyKHtcbiAgICBkYXRlLFxuICAgIGxvY2FsZVxuICB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnRCBNTU0nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnW1dlZWtdIFcgW29mXSBZWVlZJyk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRpbWUgZm9ybWF0dGluZyBkb3duIHRoZSBsZWZ0IGhhbmQgc2lkZSBvZiB0aGUgZGF5IHZpZXdcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3SG91cih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnaGEnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXG4gICAgICAubG9jYWxlKGxvY2FsZSlcbiAgICAgIC5mb3JtYXQoJ2RkZGQsIEQgTU1NTSwgWVlZWScpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXJJbnRlcmZhY2UsXG4gIERhdGVGb3JtYXR0ZXJQYXJhbXNcbn0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IGdldElTT1dlZWsgZnJvbSAnZGF0ZS1mbnMvZ2V0X2lzb193ZWVrL2luZGV4JztcblxuLyoqXG4gKiBUaGlzIHdpbGwgdXNlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SW50bDwvYT4gQVBJIHRvIGRvIGFsbCBkYXRlIGZvcm1hdHRpbmcuXG4gKlxuICogWW91IHdpbGwgbmVlZCB0byBpbmNsdWRlIGEgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hbmR5ZWFybnNoYXcvSW50bC5qcy9cIj5wb2x5ZmlsbDwvYT4gZm9yIG9sZGVyIGJyb3dzZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJOYXRpdmVEYXRlRm9ybWF0dGVyXG4gIGltcGxlbWVudHMgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGNlbGwgZGF5IG51bWJlclxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0RheU51bWJlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IGRheTogJ251bWVyaWMnIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnbG9uZydcbiAgICB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgc3ViIGhlYWRlciBkYXkgYW5kIG1vbnRoIGxhYmVsc1xuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uU3ViSGVhZGVyKHtcbiAgICBkYXRlLFxuICAgIGxvY2FsZVxuICB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7XG4gICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnc2hvcnQnXG4gICAgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHllYXI6IHN0cmluZyA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgeWVhcjogJ251bWVyaWMnXG4gICAgfSkuZm9ybWF0KGRhdGUpO1xuICAgIGNvbnN0IHdlZWtOdW1iZXI6IG51bWJlciA9IGdldElTT1dlZWsoZGF0ZSk7XG4gICAgcmV0dXJuIGBXZWVrICR7d2Vla051bWJlcn0gb2YgJHt5ZWFyfWA7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRpbWUgZm9ybWF0dGluZyBkb3duIHRoZSBsZWZ0IGhhbmQgc2lkZSBvZiB0aGUgZGF5IHZpZXdcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3SG91cih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IGhvdXI6ICdudW1lcmljJyB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRheSB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgZGF5Vmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIHdlZWtkYXk6ICdsb25nJ1xuICAgIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUsXG4gIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLXRvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIH0gZnJvbSAnLi9jYWxlbmRhci1wcmV2aW91cy12aWV3LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlIH0gZnJvbSAnLi9jYWxlbmRhci1uZXh0LXZpZXcuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyVG9kYXlEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGVQaXBlIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLnBpcGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZSc7XG5pbXBvcnQgeyBDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2suZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9kdWxlQ29uZmlnIHtcbiAgZXZlbnRUaXRsZUZvcm1hdHRlcj86IFByb3ZpZGVyO1xuICBkYXRlRm9ybWF0dGVyPzogUHJvdmlkZXI7XG4gIHV0aWxzPzogUHJvdmlkZXI7XG59XG5cbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItbW9tZW50LWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItbmF0aXZlLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIEV2ZW50QWN0aW9uIGFzIENhbGVuZGFyRXZlbnRBY3Rpb24sXG4gIERBWVNfT0ZfV0VFSyxcbiAgVmlld1BlcmlvZCBhcyBDYWxlbmRhclZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG4vKipcbiAqIEltcG9ydCB0aGlzIG1vZHVsZSB0byBpZiB5b3UncmUganVzdCB1c2luZyBhIHNpbmd1bGFyIHZpZXcgYW5kIHdhbnQgdG8gc2F2ZSBvbiBidW5kbGUgc2l6ZS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24nO1xuICogaW1wb3J0IHsgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9tb250aCc7XG4gKlxuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlLmZvclJvb3QoKSxcbiAqICAgICBDYWxlbmRhck1vbnRoTW9kdWxlXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeU1vZHVsZSB7fVxuICogYGBgXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhckV2ZW50QWN0aW9uc0NvbXBvbmVudCxcbiAgICBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50LFxuICAgIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSxcbiAgICBDYWxlbmRhclByZXZpb3VzVmlld0RpcmVjdGl2ZSxcbiAgICBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJEYXRlUGlwZSxcbiAgICBDYWxlbmRhckV2ZW50VGl0bGVQaXBlLFxuICAgIENsaWNrRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50LFxuICAgIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudCxcbiAgICBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJOZXh0Vmlld0RpcmVjdGl2ZSxcbiAgICBDYWxlbmRhclRvZGF5RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyRGF0ZVBpcGUsXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSxcbiAgICBDbGlja0RpcmVjdGl2ZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tbW9uTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDYWxlbmRhck1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEcmFnZ2FibGVIZWxwZXIsXG4gICAgICAgIGNvbmZpZy5ldmVudFRpdGxlRm9ybWF0dGVyIHx8IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAgICAgICAgY29uZmlnLmRhdGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICAgICAgICBjb25maWcudXRpbHMgfHwgQ2FsZW5kYXJVdGlsc1xuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgTE9DQUxFX0lELFxuICBJbmplY3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgV2Vla0RheSxcbiAgTW9udGhWaWV3LFxuICBNb250aFZpZXdEYXksXG4gIFZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgaXNTYW1lRGF5IGZyb20gJ2RhdGUtZm5zL2lzX3NhbWVfZGF5L2luZGV4JztcbmltcG9ydCBzZXREYXRlIGZyb20gJ2RhdGUtZm5zL3NldF9kYXRlL2luZGV4JztcbmltcG9ydCBzZXRNb250aCBmcm9tICdkYXRlLWZucy9zZXRfbW9udGgvaW5kZXgnO1xuaW1wb3J0IHNldFllYXIgZnJvbSAnZGF0ZS1mbnMvc2V0X3llYXIvaW5kZXgnO1xuaW1wb3J0IGdldERhdGUgZnJvbSAnZGF0ZS1mbnMvZ2V0X2RhdGUvaW5kZXgnO1xuaW1wb3J0IGdldE1vbnRoIGZyb20gJ2RhdGUtZm5zL2dldF9tb250aC9pbmRleCc7XG5pbXBvcnQgZ2V0WWVhciBmcm9tICdkYXRlLWZucy9nZXRfeWVhci9pbmRleCc7XG5pbXBvcnQgZGlmZmVyZW5jZUluU2Vjb25kcyBmcm9tICdkYXRlLWZucy9kaWZmZXJlbmNlX2luX3NlY29uZHMvaW5kZXgnO1xuaW1wb3J0IGFkZFNlY29uZHMgZnJvbSAnZGF0ZS1mbnMvYWRkX3NlY29uZHMvaW5kZXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHMsIHRyYWNrQnlJbmRleCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50IHtcbiAgaGVhZGVyOiBXZWVrRGF5W107XG4gIGJvZHk6IE1vbnRoVmlld0RheVtdO1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50XG4gIGV4dGVuZHMgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50IHtcbiAgZGF5OiBNb250aFZpZXdEYXk7XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItbW9udGgtdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cbiAqIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtbW9udGgtdmlld1wiPlxuICAgICAgPG13bC1jYWxlbmRhci1tb250aC12aWV3LWhlYWRlclxuICAgICAgICBbZGF5c109XCJjb2x1bW5IZWFkZXJzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXlzXCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHJvd0luZGV4IG9mIHZpZXcucm93T2Zmc2V0czsgdHJhY2tCeUluZGV4XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1jZWxsLXJvd1wiPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci1tb250aC1jZWxsXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgKHZpZXcuZGF5cyB8IHNsaWNlIDogcm93SW5kZXggOiByb3dJbmRleCArICh2aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspKTsgdHJhY2tCeTp0cmFja0J5RGF0ZVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZy1vdmVyXT1cImRheS5kcmFnT3ZlclwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImRheT8uY3NzQ2xhc3NcIlxuICAgICAgICAgICAgICBbZGF5XT1cImRheVwiXG4gICAgICAgICAgICAgIFtvcGVuRGF5XT1cIm9wZW5EYXlcIlxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZURheUNsaWNrKCRldmVudCwgZGF5KVwiXG4gICAgICAgICAgICAgIChoaWdobGlnaHREYXkpPVwidG9nZ2xlRGF5SGlnaGxpZ2h0KCRldmVudC5ldmVudCwgdHJ1ZSlcIlxuICAgICAgICAgICAgICAodW5oaWdobGlnaHREYXkpPVwidG9nZ2xlRGF5SGlnaGxpZ2h0KCRldmVudC5ldmVudCwgZmFsc2UpXCJcbiAgICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF5LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgICAgIChkcmFnTGVhdmUpPVwiZGF5LmRyYWdPdmVyID0gZmFsc2VcIlxuICAgICAgICAgICAgICAoZHJvcCk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZTsgZXZlbnREcm9wcGVkKGRheSwgJGV2ZW50LmRyb3BEYXRhLmV2ZW50KVwiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiAkZXZlbnQuZXZlbnR9KVwiPlxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItbW9udGgtY2VsbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50c1xuICAgICAgICAgICAgW2lzT3Blbl09XCJvcGVuUm93SW5kZXggPT09IHJvd0luZGV4XCJcbiAgICAgICAgICAgIFtldmVudHNdPVwib3BlbkRheT8uZXZlbnRzXCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJvcGVuRGF5RXZlbnRzVGVtcGxhdGVcIlxuICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6ICRldmVudC5ldmVudH0pXCI+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3LlxuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGV2ZW50cyBsaXN0IGZvciB0aGUgZGF5IG9mIHRoZSBgdmlld0RhdGVgIG9wdGlvbiBpcyB2aXNpYmxlIG9yIG5vdFxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlRGF5SXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGFydCBudW1iZXIgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGRheSBjZWxsXG4gICAqL1xuICBASW5wdXQoKSBjZWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIHNsaWRlIGRvd24gYm94IG9mIGV2ZW50cyBmb3IgdGhlIGFjdGl2ZSBkYXlcbiAgICovXG4gIEBJbnB1dCgpIG9wZW5EYXlFdmVudHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IGluZGljYXRlIHdoaWNoIGRheXMgYXJlIHdlZWtlbmRzXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbW9udGguXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYSBkYXkgaW4gdGhlIGJvZHkgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJlZm9yZVZpZXdSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBkYXkgY2VsbCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZGF5Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogTW9udGhWaWV3RGF5O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIENhbGVuZGFyTW9udGhWaWV3RXZlbnRUaW1lc0NoYW5nZWRFdmVudFxuICA+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbHVtbkhlYWRlcnM6IFdlZWtEYXlbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogTW9udGhWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvcGVuUm93SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlJbmRleCA9IHRyYWNrQnlJbmRleDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeURhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBNb250aFZpZXdEYXkpID0+IGRheS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMgfHwgY2hhbmdlcy53ZWVrZW5kRGF5cykge1xuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XG4gICAgICB2YWxpZGF0ZUV2ZW50cyh0aGlzLmV2ZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXNcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmFjdGl2ZURheUlzT3BlbiB8fFxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXNcbiAgICApIHtcbiAgICAgIHRoaXMuY2hlY2tBY3RpdmVEYXlJc09wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRvZ2dsZURheUhpZ2hsaWdodChldmVudDogQ2FsZW5kYXJFdmVudCwgaXNIaWdobGlnaHRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlldy5kYXlzLmZvckVhY2goZGF5ID0+IHtcbiAgICAgIGlmIChpc0hpZ2hsaWdodGVkICYmIGRheS5ldmVudHMuaW5kZXhPZihldmVudCkgPiAtMSkge1xuICAgICAgICBkYXkuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAoZXZlbnQuY29sb3IgJiYgZXZlbnQuY29sb3Iuc2Vjb25kYXJ5KSB8fCAnI0QxRThGRic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgZGF5LmJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBldmVudERyb3BwZWQoZGF5OiBNb250aFZpZXdEYXksIGV2ZW50OiBDYWxlbmRhckV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gZ2V0WWVhcihkYXkuZGF0ZSk7XG4gICAgY29uc3QgbW9udGg6IG51bWJlciA9IGdldE1vbnRoKGRheS5kYXRlKTtcbiAgICBjb25zdCBkYXRlOiBudW1iZXIgPSBnZXREYXRlKGRheS5kYXRlKTtcbiAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IHNldERhdGUoXG4gICAgICBzZXRNb250aChzZXRZZWFyKGV2ZW50LnN0YXJ0LCB5ZWFyKSwgbW9udGgpLFxuICAgICAgZGF0ZVxuICAgICk7XG4gICAgbGV0IG5ld0VuZDogRGF0ZTtcbiAgICBpZiAoZXZlbnQuZW5kKSB7XG4gICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gZGlmZmVyZW5jZUluU2Vjb25kcyhuZXdTdGFydCwgZXZlbnQuc3RhcnQpO1xuICAgICAgbmV3RW5kID0gYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcbiAgICB9XG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHsgZXZlbnQsIG5ld1N0YXJ0LCBuZXdFbmQsIGRheSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBoYW5kbGVEYXlDbGljayhjbGlja0V2ZW50OiBhbnksIGRheTogTW9udGhWaWV3RGF5KSB7XG4gICAgLy8gd2hlbiB1c2luZyBoYW1tZXJqcywgc3RvcFByb3BhZ2F0aW9uIGRvZXNuJ3Qgd29yay4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9hbmd1bGFyLWNhbGVuZGFyL2lzc3Vlcy8zMThcbiAgICBpZiAoIWNsaWNrRXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FsLWV2ZW50JykpIHtcbiAgICAgIHRoaXMuZGF5Q2xpY2tlZC5lbWl0KHsgZGF5IH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbkhlYWRlcnMgPSB0aGlzLnV0aWxzLmdldFdlZWtWaWV3SGVhZGVyKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXNcbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0TW9udGhWaWV3KHtcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzXG4gICAgfSk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FjdGl2ZURheUlzT3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3RpdmVEYXlJc09wZW4gPT09IHRydWUpIHtcbiAgICAgIHRoaXMub3BlbkRheSA9IHRoaXMudmlldy5kYXlzLmZpbmQoZGF5ID0+XG4gICAgICAgIGlzU2FtZURheShkYXkuZGF0ZSwgdGhpcy52aWV3RGF0ZSlcbiAgICAgICk7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy52aWV3LmRheXMuaW5kZXhPZih0aGlzLm9wZW5EYXkpO1xuICAgICAgdGhpcy5vcGVuUm93SW5kZXggPVxuICAgICAgICBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspICpcbiAgICAgICAgdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlblJvd0luZGV4ID0gbnVsbDtcbiAgICAgIHRoaXMub3BlbkRheSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uSGVhZGVycyA9IG51bGw7XG4gICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgdGhpcy5jaGVja0FjdGl2ZURheUlzT3BlbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW5IZWFkZXJzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBoZWFkZXI6IHRoaXMuY29sdW1uSGVhZGVycyxcbiAgICAgICAgYm9keTogdGhpcy52aWV3LmRheXMsXG4gICAgICAgIHBlcmlvZDogdGhpcy52aWV3LnBlcmlvZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1kYXlzPVwiZGF5c1wiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWNlbGwtcm93IGNhbC1oZWFkZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWNlbGxcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5czsgdHJhY2tCeTp0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtcGFzdF09XCJkYXkuaXNQYXN0XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIj5cbiAgICAgICAgICB7eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTonbW9udGhWaWV3Q29sdW1uSGVhZGVyJzpsb2NhbGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF5czogZGF5cywgbG9jYWxlOiBsb2NhbGV9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb250aFZpZXdEYXksIENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheT1cImRheVwiXG4gICAgICBsZXQtb3BlbkRheT1cIm9wZW5EYXlcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWhpZ2hsaWdodERheT1cImhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtdW5oaWdobGlnaHREYXk9XCJ1bmhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWNlbGwtdG9wXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1iYWRnZVwiICpuZ0lmPVwiZGF5LmJhZGdlVG90YWwgPiAwXCI+e3sgZGF5LmJhZGdlVG90YWwgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1udW1iZXJcIj57eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTonbW9udGhWaWV3RGF5TnVtYmVyJzpsb2NhbGUgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCIgKm5nSWY9XCJkYXkuZXZlbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50czsgdHJhY2tCeTp0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJldmVudC5jb2xvcj8ucHJpbWFyeVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgICAobW91c2VlbnRlcik9XCJoaWdobGlnaHREYXkuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIlxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cInVuaGlnaGxpZ2h0RGF5LmVtaXQoe2V2ZW50OiBldmVudH0pXCJcbiAgICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cImV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlOidtb250aFRvb2x0aXAnOmV2ZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICBbdG9vbHRpcEV2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgW2Ryb3BEYXRhXT1cIntldmVudDogZXZlbnR9XCJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IGV2ZW50LmRyYWdnYWJsZSwgeTogZXZlbnQuZHJhZ2dhYmxlfVwiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgb3BlbkRheTogb3BlbkRheSxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGhpZ2hsaWdodERheTogaGlnaGxpZ2h0RGF5LFxuICAgICAgICB1bmhpZ2hsaWdodERheTogdW5oaWdobGlnaHREYXksXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keVxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2NhbC1jZWxsIGNhbC1kYXktY2VsbCcsXG4gICAgJ1tjbGFzcy5jYWwtcGFzdF0nOiAnZGF5LmlzUGFzdCcsXG4gICAgJ1tjbGFzcy5jYWwtdG9kYXldJzogJ2RheS5pc1RvZGF5JyxcbiAgICAnW2NsYXNzLmNhbC1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXG4gICAgJ1tjbGFzcy5jYWwtd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXG4gICAgJ1tjbGFzcy5jYWwtaW4tbW9udGhdJzogJ2RheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWwtaGFzLWV2ZW50c10nOiAnZGF5LmV2ZW50cy5sZW5ndGggPiAwJyxcbiAgICAnW2NsYXNzLmNhbC1vcGVuXSc6ICdkYXkgPT09IG9wZW5EYXknLFxuICAgICdbc3R5bGUuYmFja2dyb3VuZENvbG9yXSc6ICdkYXkuYmFja2dyb3VuZENvbG9yJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgaGlnaGxpZ2h0RGF5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdW5oaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeUV2ZW50SWQgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWV2ZW50cz1cImV2ZW50c1wiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCI+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiBldmVudHM7IHRyYWNrQnk6dHJhY2tCeUV2ZW50SWRcIlxuICAgICAgICBbbmdDbGFzc109XCJldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgW2Ryb3BEYXRhXT1cIntldmVudDogZXZlbnR9XCJcbiAgICAgICAgW2RyYWdBeGlzXT1cInt4OiBldmVudC5kcmFnZ2FibGUsIHk6IGV2ZW50LmRyYWdnYWJsZX1cIj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJldmVudC5jb2xvcj8ucHJpbWFyeVwiPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgICZuZ3NwO1xuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICB2aWV3PVwibW9udGhcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIj5cbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XG4gICAgICAgICZuZ3NwO1xuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMgW2V2ZW50XT1cImV2ZW50XCI+PC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNhbC1vcGVuLWRheS1ldmVudHNcIiBbQGNvbGxhcHNlXSAqbmdJZj1cImlzT3BlblwiPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWRcbiAgICAgICAgfVwiPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NvbGxhcHNlJywgW1xuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogMCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pLFxuICAgICAgICBhbmltYXRlKCcxNTBtcycsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pLFxuICAgICAgICBhbmltYXRlKCcxNTBtcycsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIHRyYWNrQnlFdmVudElkID0gdHJhY2tCeUV2ZW50SWQ7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50LFxuICBDYWxlbmRhck1vbnRoVmlld0V2ZW50VGltZXNDaGFuZ2VkRXZlbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5leHBvcnQgeyBNb250aFZpZXdEYXkgYXMgQ2FsZW5kYXJNb250aFZpZXdEYXkgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERyYWdBbmREcm9wTW9kdWxlLCBDYWxlbmRhckNvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50LFxuICAgIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJPcGVuRGF5RXZlbnRzQ29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgaXNJbnNpZGUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEcmFnSGVscGVyIHtcbiAgc3RhcnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRyYWdDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBkcmFnZ2FibGVFbGVtZW50OiBIVE1MRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgdmFsaWRhdGVEcmFnKHsgeCwgeSB9OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pOiBib29sZWFuIHtcbiAgICBjb25zdCBuZXdSZWN0OiBDbGllbnRSZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGFydFBvc2l0aW9uLCB7XG4gICAgICBsZWZ0OiB0aGlzLnN0YXJ0UG9zaXRpb24ubGVmdCArIHgsXG4gICAgICByaWdodDogdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0ICsgeCxcbiAgICAgIHRvcDogdGhpcy5zdGFydFBvc2l0aW9uLnRvcCArIHksXG4gICAgICBib3R0b206IHRoaXMuc3RhcnRQb3NpdGlvbi5ib3R0b20gKyB5XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXNJbnNpZGUodGhpcy5kcmFnQ29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgbmV3UmVjdCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzSW5zaWRlIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmVzaXplSGVscGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNpemVDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwcml2YXRlIG1pbldpZHRoPzogbnVtYmVyXG4gICkge31cblxuICB2YWxpZGF0ZVJlc2l6ZSh7IHJlY3RhbmdsZSB9OiB7IHJlY3RhbmdsZTogQ2xpZW50UmVjdCB9KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubWluV2lkdGggJiYgcmVjdGFuZ2xlLndpZHRoIDwgdGhpcy5taW5XaWR0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBpc0luc2lkZShcbiAgICAgIHRoaXMucmVzaXplQ29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHJlY3RhbmdsZVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgTE9DQUxFX0lELFxuICBJbmplY3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBXZWVrRGF5LFxuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrVmlld0V2ZW50LFxuICBXZWVrVmlldyxcbiAgVmlld1BlcmlvZFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IGFkZERheXMgZnJvbSAnZGF0ZS1mbnMvYWRkX2RheXMvaW5kZXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEcmFnSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHMsIHRyYWNrQnlJbmRleCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBXZWVrVmlld0V2ZW50UmVzaXplIHtcbiAgb3JpZ2luYWxPZmZzZXQ6IG51bWJlcjtcbiAgb3JpZ2luYWxTcGFuOiBudW1iZXI7XG4gIGVkZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQge1xuICBoZWFkZXI6IFdlZWtEYXlbXTtcbiAgcGVyaW9kOiBWaWV3UGVyaW9kO1xufVxuXG4vKipcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiB3ZWVrLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtd2Vlay12aWV3XCIgI3dlZWtWaWV3Q29udGFpbmVyPlxuICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyXG4gICAgICAgIFtkYXlzXT1cImRheXNcIlxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJoZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIChkYXlIZWFkZXJDbGlja2VkKT1cImRheUhlYWRlckNsaWNrZWQuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGV2ZW50RHJvcHBlZCk9XCJldmVudFRpbWVzQ2hhbmdlZC5lbWl0KCRldmVudClcIj5cbiAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXI+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBldmVudFJvdyBvZiB2aWV3LmV2ZW50Um93czsgdHJhY2tCeTp0cmFja0J5SW5kZXhcIiAjZXZlbnRSb3dDb250YWluZXIgY2xhc3M9XCJjYWwtZXZlbnRzLXJvd1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgKm5nRm9yPVwibGV0IHdlZWtFdmVudCBvZiBldmVudFJvdy5yb3c7IHRyYWNrQnk6dHJhY2tCeUV2ZW50SWRcIlxuICAgICAgICAgICNldmVudFxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwid2Vla0V2ZW50LmV2ZW50LmRyYWdnYWJsZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLXdlZWtdPVwiIXdlZWtFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLXdlZWtdPVwiIXdlZWtFdmVudC5lbmRzQWZ0ZXJXZWVrXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ3ZWVrRXZlbnQuZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiKCgxMDAgLyBkYXlzLmxlbmd0aCkgKiB3ZWVrRXZlbnQuc3BhbikgKyAnJSdcIlxuICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0XT1cIigoMTAwIC8gZGF5cy5sZW5ndGgpICogd2Vla0V2ZW50Lm9mZnNldCkgKyAnJSdcIlxuICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7bGVmdDogd2Vla0V2ZW50LmV2ZW50Py5yZXNpemFibGU/LmJlZm9yZVN0YXJ0LCByaWdodDogd2Vla0V2ZW50LmV2ZW50Py5yZXNpemFibGU/LmFmdGVyRW5kfVwiXG4gICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cIntsZWZ0OiBkYXlDb2x1bW5XaWR0aCwgcmlnaHQ6IGRheUNvbHVtbldpZHRofVwiXG4gICAgICAgICAgW3ZhbGlkYXRlUmVzaXplXT1cInZhbGlkYXRlUmVzaXplXCJcbiAgICAgICAgICAocmVzaXplU3RhcnQpPVwicmVzaXplU3RhcnRlZCh3ZWVrVmlld0NvbnRhaW5lciwgd2Vla0V2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAocmVzaXppbmcpPVwicmVzaXppbmcod2Vla0V2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoKVwiXG4gICAgICAgICAgKHJlc2l6ZUVuZCk9XCJyZXNpemVFbmRlZCh3ZWVrRXZlbnQpXCJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IHdlZWtFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCwgeTogZmFsc2V9XCJcbiAgICAgICAgICBbZHJhZ1NuYXBHcmlkXT1cInt4OiBkYXlDb2x1bW5XaWR0aH1cIlxuICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAoZHJhZ1BvaW50ZXJEb3duKT1cImRyYWdTdGFydCh3ZWVrVmlld0NvbnRhaW5lciwgZXZlbnQpXCJcbiAgICAgICAgICAoZHJhZ0VuZCk9XCJldmVudERyYWdnZWQod2Vla0V2ZW50LCAkZXZlbnQueCwgZGF5Q29sdW1uV2lkdGgpXCI+XG4gICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnRcbiAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwid2Vla0V2ZW50XCJcbiAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHtldmVudDogd2Vla0V2ZW50LmV2ZW50fSlcIj5cbiAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nID0gJ2JvdHRvbSc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGFydCBudW1iZXIgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB3ZWVrIHZpZXcgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlY2lzaW9uIHRvIGRpc3BsYXkgZXZlbnRzLlxuICAgKiBgZGF5c2Agd2lsbCByb3VuZCBldmVudCBzdGFydCBhbmQgZW5kIGRhdGVzIHRvIHRoZSBuZWFyZXN0IGRheSBhbmQgYG1pbnV0ZXNgIHdpbGwgbm90IGRvIHRoaXMgcm91bmRpbmdcbiAgICovXG4gIEBJbnB1dCgpIHByZWNpc2lvbjogJ2RheXMnIHwgJ21pbnV0ZXMnID0gJ2RheXMnO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZC4gQWRkaW5nIGEgYGNzc0NsYXNzYCBwcm9wZXJ0eSBvbiBgJGV2ZW50LmRheWAgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBkYXlIZWFkZXJDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXk6IFdlZWtEYXkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXk6IFdlZWtEYXk7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFxuICAgIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFxuICA+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgd2Vlay5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgaGVhZGVyIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgZWxlbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogV2Vla1ZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY3VycmVudFJlc2l6ZXM6IE1hcDxXZWVrVmlld0V2ZW50LCBXZWVrVmlld0V2ZW50UmVzaXplPiA9IG5ldyBNYXAoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZVJlc2l6ZTogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZGF5Q29sdW1uV2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUluZGV4ID0gdHJhY2tCeUluZGV4O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RXZlbnRJZCA9IChpbmRleDogbnVtYmVyLCB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQpID0+XG4gICAgd2Vla0V2ZW50LmV2ZW50LmlkID8gd2Vla0V2ZW50LmV2ZW50LmlkIDogd2Vla0V2ZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB1dGlsczogQ2FsZW5kYXJVdGlscyxcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8IGNoYW5nZXMud2Vla2VuZERheXMpIHtcbiAgICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cykge1xuICAgICAgdmFsaWRhdGVFdmVudHModGhpcy5ldmVudHMpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlc2l6ZVN0YXJ0ZWQoXG4gICAgd2Vla1ZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5zZXQod2Vla0V2ZW50LCB7XG4gICAgICBvcmlnaW5hbE9mZnNldDogd2Vla0V2ZW50Lm9mZnNldCxcbiAgICAgIG9yaWdpbmFsU3Bhbjogd2Vla0V2ZW50LnNwYW4sXG4gICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgfSk7XG4gICAgdGhpcy5kYXlDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgod2Vla1ZpZXdDb250YWluZXIpO1xuICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIoXG4gICAgICB3ZWVrVmlld0NvbnRhaW5lcixcbiAgICAgIHRoaXMuZGF5Q29sdW1uV2lkdGhcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGVSZXNpemUgPSAoeyByZWN0YW5nbGUgfSkgPT5cbiAgICAgIHJlc2l6ZUhlbHBlci52YWxpZGF0ZVJlc2l6ZSh7IHJlY3RhbmdsZSB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZXNpemluZyhcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LFxuICAgIGRheVdpZHRoOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogV2Vla1ZpZXdFdmVudFJlc2l6ZSA9IHRoaXMuY3VycmVudFJlc2l6ZXMuZ2V0KFxuICAgICAgd2Vla0V2ZW50XG4gICAgKTtcblxuICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy5sZWZ0KSB7XG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5sZWZ0IC8gZGF5V2lkdGgpO1xuICAgICAgd2Vla0V2ZW50Lm9mZnNldCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQgKyBkaWZmO1xuICAgICAgd2Vla0V2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiAtIGRpZmY7XG4gICAgfSBlbHNlIGlmIChyZXNpemVFdmVudC5lZGdlcy5yaWdodCkge1xuICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgLyBkYXlXaWR0aCk7XG4gICAgICB3ZWVrRXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuICsgZGlmZjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVzaXplRW5kZWQod2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogV2Vla1ZpZXdFdmVudFJlc2l6ZSA9IHRoaXMuY3VycmVudFJlc2l6ZXMuZ2V0KFxuICAgICAgd2Vla0V2ZW50XG4gICAgKTtcblxuICAgIGxldCBkYXlzRGlmZjogbnVtYmVyO1xuICAgIGlmIChjdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0Jykge1xuICAgICAgZGF5c0RpZmYgPSB3ZWVrRXZlbnQub2Zmc2V0IC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbE9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5c0RpZmYgPSB3ZWVrRXZlbnQuc3BhbiAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xuICAgIH1cblxuICAgIHdlZWtFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xuICAgIHdlZWtFdmVudC5zcGFuID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XG5cbiAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSB3ZWVrRXZlbnQuZXZlbnQuc3RhcnQ7XG4gICAgbGV0IG5ld0VuZDogRGF0ZSA9IHdlZWtFdmVudC5ldmVudC5lbmQ7XG4gICAgaWYgKGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ2xlZnQnKSB7XG4gICAgICBuZXdTdGFydCA9IGFkZERheXMobmV3U3RhcnQsIGRheXNEaWZmKTtcbiAgICB9IGVsc2UgaWYgKG5ld0VuZCkge1xuICAgICAgbmV3RW5kID0gYWRkRGF5cyhuZXdFbmQsIGRheXNEaWZmKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBuZXdTdGFydCwgbmV3RW5kLCBldmVudDogd2Vla0V2ZW50LmV2ZW50IH0pO1xuICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuZGVsZXRlKHdlZWtFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXZlbnREcmFnZ2VkKFxuICAgIHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudCxcbiAgICBkcmFnZ2VkQnlQeDogbnVtYmVyLFxuICAgIGRheVdpZHRoOiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZGF5c0RyYWdnZWQ6IG51bWJlciA9IGRyYWdnZWRCeVB4IC8gZGF5V2lkdGg7XG4gICAgY29uc3QgbmV3U3RhcnQ6IERhdGUgPSBhZGREYXlzKHdlZWtFdmVudC5ldmVudC5zdGFydCwgZGF5c0RyYWdnZWQpO1xuICAgIGxldCBuZXdFbmQ6IERhdGU7XG4gICAgaWYgKHdlZWtFdmVudC5ldmVudC5lbmQpIHtcbiAgICAgIG5ld0VuZCA9IGFkZERheXMod2Vla0V2ZW50LmV2ZW50LmVuZCwgZGF5c0RyYWdnZWQpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7IG5ld1N0YXJ0LCBuZXdFbmQsIGV2ZW50OiB3ZWVrRXZlbnQuZXZlbnQgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRSb3dDb250YWluZXI6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihldmVudFJvd0NvbnRhaW5lci5vZmZzZXRXaWR0aCAvIHRoaXMuZGF5cy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdTdGFydCh3ZWVrVmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGV2ZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuZGF5Q29sdW1uV2lkdGggPSB0aGlzLmdldERheUNvbHVtbldpZHRoKHdlZWtWaWV3Q29udGFpbmVyKTtcbiAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKFxuICAgICAgd2Vla1ZpZXdDb250YWluZXIsXG4gICAgICBldmVudFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZURyYWcgPSAoeyB4LCB5IH0pID0+XG4gICAgICB0aGlzLmN1cnJlbnRSZXNpemVzLnNpemUgPT09IDAgJiYgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoeyB4LCB5IH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGF5cyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5c1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEJvZHkoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy51dGlscy5nZXRXZWVrVmlldyh7XG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICBwcmVjaXNpb246IHRoaXMucHJlY2lzaW9uLFxuICAgICAgYWJzb2x1dGVQb3NpdGlvbmVkRXZlbnRzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xuICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xuICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF5cyAmJiB0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMuYmVmb3JlVmlld1JlbmRlci5lbWl0KHtcbiAgICAgICAgaGVhZGVyOiB0aGlzLmRheXMsXG4gICAgICAgIHBlcmlvZDogdGhpcy52aWV3LnBlcmlvZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBXZWVrRGF5IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZGF5cz1cImRheXNcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtZGF5SGVhZGVyQ2xpY2tlZD1cImRheUhlYWRlckNsaWNrZWRcIlxuICAgICAgbGV0LWV2ZW50RHJvcHBlZD1cImV2ZW50RHJvcHBlZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXktaGVhZGVyc1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtaGVhZGVyXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IHRyYWNrQnk6dHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1mdXR1cmVdPVwiZGF5LmlzRnV0dXJlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnLW92ZXJdPVwiZGF5LmRyYWdPdmVyXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoe2RheTogZGF5fSlcIlxuICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF5LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgKGRyYWdMZWF2ZSk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgKGRyb3ApPVwiZGF5LmRyYWdPdmVyID0gZmFsc2U7IGV2ZW50RHJvcHBlZC5lbWl0KHtldmVudDogJGV2ZW50LmRyb3BEYXRhLmV2ZW50LCBuZXdTdGFydDogZGF5LmRhdGV9KVwiPlxuICAgICAgICAgIDxiPnt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOid3ZWVrVmlld0NvbHVtbkhlYWRlcic6bG9jYWxlIH19PC9iPjxicj5cbiAgICAgICAgICA8c3Bhbj57eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTond2Vla1ZpZXdDb2x1bW5TdWJIZWFkZXInOmxvY2FsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF5czogZGF5cywgbG9jYWxlOiBsb2NhbGUsIGRheUhlYWRlckNsaWNrZWQ6IGRheUhlYWRlckNsaWNrZWQsIGV2ZW50RHJvcHBlZDogZXZlbnREcm9wcGVkfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZGF5SGVhZGVyQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF5OiBXZWVrRGF5IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBXZWVrRGF5O1xuICB9PigpO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudERyb3BwZWQ6IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgbmV3U3RhcnQ6IERhdGU7XG4gIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50OyBuZXdTdGFydDogRGF0ZSB9PigpO1xuXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdlZWtWaWV3RXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXdlZWtFdmVudD1cIndlZWtFdmVudFwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwid2Vla0V2ZW50LmV2ZW50LmNvbG9yPy5zZWNvbmRhcnlcIlxuICAgICAgICBbc3R5bGUuYm9yZGVyQ29sb3JdPVwid2Vla0V2ZW50LmV2ZW50LmNvbG9yPy5wcmltYXJ5XCJcbiAgICAgICAgW213bENhbGVuZGFyVG9vbHRpcF09XCJ3ZWVrRXZlbnQuZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6J3dlZWtUb29sdGlwJzp3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIj5cbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIj48L213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zPlxuICAgICAgICAmbmdzcDtcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC10aXRsZVxuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgIHZpZXc9XCJ3ZWVrXCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoKVwiPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgd2Vla0V2ZW50OiB3ZWVrRXZlbnQsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keVxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IHtcbiAgQElucHV0KCkgd2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXG4gIENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudFxufSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xuZXhwb3J0IHtcbiAgV2Vla1ZpZXdFdmVudCBhcyBDYWxlbmRhcldlZWtWaWV3RXZlbnQsXG4gIFdlZWtWaWV3RXZlbnRSb3cgYXMgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Um93LFxuICBHZXRXZWVrVmlld0FyZ3MgYXMgQ2FsZW5kYXJHZXRXZWVrVmlld0FyZ3Ncbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBSZXNpemFibGVNb2R1bGUsXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla01vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBEYXlWaWV3LFxuICBEYXlWaWV3SG91cixcbiAgRGF5Vmlld0hvdXJTZWdtZW50LFxuICBEYXlWaWV3RXZlbnQsXG4gIFZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IGFkZE1pbnV0ZXMgZnJvbSAnZGF0ZS1mbnMvYWRkX21pbnV0ZXMvaW5kZXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEcmFnSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHMsIHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50IHtcbiAgYm9keToge1xuICAgIGhvdXJHcmlkOiBEYXlWaWV3SG91cltdO1xuICB9O1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5jb25zdCBNSU5VVEVTX0lOX0hPVVI6IG51bWJlciA9IDYwO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEYXlWaWV3RXZlbnRSZXNpemUge1xuICBvcmlnaW5hbFRvcDogbnVtYmVyO1xuICBvcmlnaW5hbEhlaWdodDogbnVtYmVyO1xuICBlZGdlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIGRheS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8bXdsLWNhbGVuZGFyLWRheS12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItZGF5LXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS12aWV3XCIgI2RheVZpZXdDb250YWluZXI+XG4gICAgICA8bXdsLWNhbGVuZGFyLWFsbC1kYXktZXZlbnRcbiAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIHZpZXcuYWxsRGF5RXZlbnRzOyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImFsbERheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiBldmVudH0pXCI+XG4gICAgICA8L213bC1jYWxlbmRhci1hbGwtZGF5LWV2ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ob3VyLXJvd3NcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiB2aWV3Py5ldmVudHM7IHRyYWNrQnk6dHJhY2tCeURheUV2ZW50XCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJkYXlFdmVudC5ldmVudC5kcmFnZ2FibGVcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4tZGF5XT1cIiFkYXlFdmVudC5lbmRzQWZ0ZXJEYXlcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiZGF5RXZlbnQuZXZlbnQuY3NzQ2xhc3NcIlxuICAgICAgICAgICAgbXdsUmVzaXphYmxlXG4gICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwie3RvcDogZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQsIGJvdHRvbTogZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmR9XCJcbiAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7dG9wOiBldmVudFNuYXBTaXplLCBib3R0b206IGV2ZW50U25hcFNpemV9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAocmVzaXplU3RhcnQpPVwicmVzaXplU3RhcnRlZChkYXlFdmVudCwgJGV2ZW50LCBkYXlWaWV3Q29udGFpbmVyKVwiXG4gICAgICAgICAgICAocmVzaXppbmcpPVwicmVzaXppbmcoZGF5RXZlbnQsICRldmVudClcIlxuICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJyZXNpemVFbmRlZChkYXlFdmVudClcIlxuICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IGZhbHNlLCB5OiBkYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMH1cIlxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJ7eTogZXZlbnRTbmFwU2l6ZX1cIlxuICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxuICAgICAgICAgICAgKGRyYWdQb2ludGVyRG93bik9XCJkcmFnU3RhcnQoZXZlbnQsIGRheVZpZXdDb250YWluZXIpXCJcbiAgICAgICAgICAgIChkcmFnRW5kKT1cImV2ZW50RHJhZ2dlZChkYXlFdmVudCwgJGV2ZW50LnkpXCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5Ub3AucHhdPVwiZGF5RXZlbnQudG9wXCJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZGF5RXZlbnQuaGVpZ2h0XCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0LnB4XT1cImRheUV2ZW50LmxlZnQgKyA3MFwiXG4gICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZGF5RXZlbnQud2lkdGggLSAxXCI+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50XG4gICAgICAgICAgICAgIFtkYXlFdmVudF09XCJkYXlFdmVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IGRheUV2ZW50LmV2ZW50fSlcIj5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ob3VyXCIgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91cnM7IHRyYWNrQnk6dHJhY2tCeUhvdXJcIiBbc3R5bGUubWluV2lkdGgucHhdPVwidmlldz8ud2lkdGggKyA3MFwiPlxuICAgICAgICAgIDxtd2wtY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzOyB0cmFja0J5OnRyYWNrQnlIb3VyU2VnbWVudFwiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHtkYXRlOiBzZWdtZW50LmRhdGV9KVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWctb3Zlcl09XCJzZWdtZW50LmRyYWdPdmVyXCJcbiAgICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJzZWdtZW50LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgICAoZHJhZ0xlYXZlKT1cInNlZ21lbnQuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgICAoZHJvcCk9XCJzZWdtZW50LmRyYWdPdmVyID0gZmFsc2U7IGV2ZW50RHJvcHBlZCgkZXZlbnQsIHNlZ21lbnQpXCI+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gMzA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcblxuICAvKipcbiAgICogVGhlIHdpZHRoIGluIHBpeGVscyBvZiBlYWNoIGV2ZW50IG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBldmVudFdpZHRoOiBudW1iZXIgPSAxNTA7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGdyaWQgc2l6ZSB0byBzbmFwIHJlc2l6aW5nIGFuZCBkcmFnZ2luZyBvZiBldmVudHMgdG9cbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50U25hcFNpemU6IG51bWJlciA9IHRoaXMuaG91clNlZ21lbnRIZWlnaHQ7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGFsbCBkYXkgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRhdGU6IERhdGU7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50VGltZXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgZGF5LlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGFuIGhvdXIgZ3JpZCBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgaG91cnM6IERheVZpZXdIb3VyW10gPSBbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogRGF5VmlldztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY3VycmVudFJlc2l6ZXM6IE1hcDxEYXlWaWV3RXZlbnQsIERheVZpZXdFdmVudFJlc2l6ZT4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlRHJhZzogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVSZXNpemU6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlFdmVudElkID0gdHJhY2tCeUV2ZW50SWQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlEYXlFdmVudCA9IChpbmRleDogbnVtYmVyLCBkYXlFdmVudDogRGF5Vmlld0V2ZW50KSA9PlxuICAgIGRheUV2ZW50LmV2ZW50LmlkID8gZGF5RXZlbnQuZXZlbnQuaWQgOiBkYXlFdmVudC5ldmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSAoaW5kZXg6IG51bWJlciwgaG91cjogRGF5Vmlld0hvdXIpID0+XG4gICAgaG91ci5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IChpbmRleDogbnVtYmVyLCBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnQpID0+XG4gICAgc2VnbWVudC5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudHNcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XG4gICAgICB2YWxpZGF0ZUV2ZW50cyh0aGlzLmV2ZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50V2lkdGhcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBldmVudERyb3BwZWQoXG4gICAgZHJvcEV2ZW50OiB7IGRyb3BEYXRhPzogeyBldmVudD86IENhbGVuZGFyRXZlbnQgfSB9LFxuICAgIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudFxuICApOiB2b2lkIHtcbiAgICBpZiAoZHJvcEV2ZW50LmRyb3BEYXRhICYmIGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgZXZlbnQ6IGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCxcbiAgICAgICAgbmV3U3RhcnQ6IHNlZ21lbnQuZGF0ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzaXplU3RhcnRlZChcbiAgICBldmVudDogRGF5Vmlld0V2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCxcbiAgICBkYXlWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudFxuICApOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRSZXNpemVzLnNldChldmVudCwge1xuICAgICAgb3JpZ2luYWxUb3A6IGV2ZW50LnRvcCxcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBldmVudC5oZWlnaHQsXG4gICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJyA/ICd0b3AnIDogJ2JvdHRvbSdcbiAgICB9KTtcbiAgICBjb25zdCByZXNpemVIZWxwZXI6IENhbGVuZGFyUmVzaXplSGVscGVyID0gbmV3IENhbGVuZGFyUmVzaXplSGVscGVyKFxuICAgICAgZGF5Vmlld0NvbnRhaW5lclxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVzaXppbmcoZXZlbnQ6IERheVZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZXZlbnQpO1xuICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy50b3ApIHtcbiAgICAgIGV2ZW50LnRvcCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3AgKyArcmVzaXplRXZlbnQuZWRnZXMudG9wO1xuICAgICAgZXZlbnQuaGVpZ2h0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodCAtICtyZXNpemVFdmVudC5lZGdlcy50b3A7XG4gICAgfSBlbHNlIGlmIChyZXNpemVFdmVudC5lZGdlcy5ib3R0b20pIHtcbiAgICAgIGV2ZW50LmhlaWdodCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQgKyArcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUVuZGVkKGRheUV2ZW50OiBEYXlWaWV3RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBEYXlWaWV3RXZlbnRSZXNpemUgPSB0aGlzLmN1cnJlbnRSZXNpemVzLmdldChkYXlFdmVudCk7XG5cbiAgICBsZXQgcGl4ZWxzTW92ZWQ6IG51bWJlcjtcbiAgICBpZiAoY3VycmVudFJlc2l6ZS5lZGdlID09PSAndG9wJykge1xuICAgICAgcGl4ZWxzTW92ZWQgPSBkYXlFdmVudC50b3AgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaXhlbHNNb3ZlZCA9IGRheUV2ZW50LmhlaWdodCAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQ7XG4gICAgfVxuXG4gICAgZGF5RXZlbnQudG9wID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICBkYXlFdmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXM6IG51bWJlciA9XG4gICAgICBNSU5VVEVTX0lOX0hPVVIgLyAodGhpcy5ob3VyU2VnbWVudHMgKiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0KTtcbiAgICBjb25zdCBtaW51dGVzTW92ZWQ6IG51bWJlciA9IHBpeGVsc01vdmVkICogcGl4ZWxBbW91bnRJbk1pbnV0ZXM7XG4gICAgbGV0IG5ld1N0YXJ0OiBEYXRlID0gZGF5RXZlbnQuZXZlbnQuc3RhcnQ7XG4gICAgbGV0IG5ld0VuZDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LmVuZDtcbiAgICBpZiAoY3VycmVudFJlc2l6ZS5lZGdlID09PSAndG9wJykge1xuICAgICAgbmV3U3RhcnQgPSBhZGRNaW51dGVzKG5ld1N0YXJ0LCBtaW51dGVzTW92ZWQpO1xuICAgIH0gZWxzZSBpZiAobmV3RW5kKSB7XG4gICAgICBuZXdFbmQgPSBhZGRNaW51dGVzKG5ld0VuZCwgbWludXRlc01vdmVkKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBuZXdTdGFydCwgbmV3RW5kLCBldmVudDogZGF5RXZlbnQuZXZlbnQgfSk7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5kZWxldGUoZGF5RXZlbnQpO1xuICB9XG5cbiAgZHJhZ1N0YXJ0KGV2ZW50OiBIVE1MRWxlbWVudCwgZGF5Vmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKFxuICAgICAgZGF5Vmlld0NvbnRhaW5lcixcbiAgICAgIGV2ZW50XG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7IHgsIHkgfSkgPT5cbiAgICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJiBkcmFnSGVscGVyLnZhbGlkYXRlRHJhZyh7IHgsIHkgfSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBldmVudERyYWdnZWQoZGF5RXZlbnQ6IERheVZpZXdFdmVudCwgZHJhZ2dlZEluUGl4ZWxzOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbEFtb3VudEluTWludXRlczogbnVtYmVyID1cbiAgICAgIE1JTlVURVNfSU5fSE9VUiAvICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpO1xuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZDogbnVtYmVyID0gZHJhZ2dlZEluUGl4ZWxzICogcGl4ZWxBbW91bnRJbk1pbnV0ZXM7XG4gICAgY29uc3QgbmV3U3RhcnQ6IERhdGUgPSBhZGRNaW51dGVzKGRheUV2ZW50LmV2ZW50LnN0YXJ0LCBtaW51dGVzTW92ZWQpO1xuICAgIGxldCBuZXdFbmQ6IERhdGU7XG4gICAgaWYgKGRheUV2ZW50LmV2ZW50LmVuZCkge1xuICAgICAgbmV3RW5kID0gYWRkTWludXRlcyhkYXlFdmVudC5ldmVudC5lbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7IG5ld1N0YXJ0LCBuZXdFbmQsIGV2ZW50OiBkYXlFdmVudC5ldmVudCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhvdXJHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMuaG91cnMgPSB0aGlzLnV0aWxzLmdldERheVZpZXdIb3VyR3JpZCh7XG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy51dGlscy5nZXREYXlWaWV3KHtcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGV2ZW50V2lkdGg6IHRoaXMuZXZlbnRXaWR0aCxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IHRoaXMuaG91clNlZ21lbnRIZWlnaHRcbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhvdXJzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaG91ckdyaWQ6IHRoaXMuaG91cnNcbiAgICAgICAgfSxcbiAgICAgICAgcGVyaW9kOiB0aGlzLnZpZXcucGVyaW9kXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1hbGwtZGF5LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1ldmVudD1cImV2ZW50XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtYWxsLWRheS1ldmVudFwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiZXZlbnQuY29sb3I/LnNlY29uZGFyeVwiXG4gICAgICAgIFtzdHlsZS5ib3JkZXJDb2xvcl09XCJldmVudC5jb2xvcj8ucHJpbWFyeVwiPlxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMgW2V2ZW50XT1cImV2ZW50XCI+PC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgIHZpZXc9XCJkYXlcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCgpXCI+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkXG4gICAgICB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckFsbERheUV2ZW50Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERheVZpZXdIb3VyU2VnbWVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtc2VnbWVudD1cInNlZ21lbnRcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ob3VyLXNlZ21lbnRcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInNlZ21lbnRIZWlnaHRcIlxuICAgICAgICBbY2xhc3MuY2FsLWhvdXItc3RhcnRdPVwic2VnbWVudC5pc1N0YXJ0XCJcbiAgICAgICAgW2NsYXNzLmNhbC1hZnRlci1ob3VyLXN0YXJ0XT1cIiFzZWdtZW50LmlzU3RhcnRcIlxuICAgICAgICBbbmdDbGFzc109XCJzZWdtZW50LmNzc0NsYXNzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiPlxuICAgICAgICAgIHt7IHNlZ21lbnQuZGF0ZSB8IGNhbGVuZGFyRGF0ZTonZGF5Vmlld0hvdXInOmxvY2FsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgc2VnbWVudDogc2VnbWVudCxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0hvdXJTZWdtZW50Q29tcG9uZW50IHtcbiAgQElucHV0KCkgc2VnbWVudDogRGF5Vmlld0hvdXJTZWdtZW50O1xuXG4gIEBJbnB1dCgpIHNlZ21lbnRIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERheVZpZXdFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1kYXlFdmVudD1cImRheUV2ZW50XCJcbiAgICAgIGxldC10b29sdGlwUGxhY2VtZW50PVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJkYXlFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5XCJcbiAgICAgICAgW3N0eWxlLmJvcmRlckNvbG9yXT1cImRheUV2ZW50LmV2ZW50LmNvbG9yPy5wcmltYXJ5XCJcbiAgICAgICAgW213bENhbGVuZGFyVG9vbHRpcF09XCJkYXlFdmVudC5ldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTonZGF5VG9vbHRpcCc6ZGF5RXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJkYXlFdmVudC5ldmVudFwiXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiPlxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMgW2V2ZW50XT1cImRheUV2ZW50LmV2ZW50XCI+PC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwiZGF5RXZlbnQuZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgIHZpZXc9XCJkYXlcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCgpXCI+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBkYXlFdmVudDogZGF5RXZlbnQsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keVxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3RXZlbnRDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXlFdmVudDogRGF5Vmlld0V2ZW50O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJBbGxEYXlFdmVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItYWxsLWRheS1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3SG91clNlZ21lbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3RXZlbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWRheS12aWV3LWV2ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVzaXphYmxlTW9kdWxlLFxuICAgIERyYWdBbmREcm9wTW9kdWxlLFxuICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhckFsbERheUV2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyRGF5Vmlld0hvdXJTZWdtZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyRGF5Vmlld0V2ZW50Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBSZXNpemFibGVNb2R1bGUsXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyQWxsRGF5RXZlbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3SG91clNlZ21lbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3RXZlbnRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgQ2FsZW5kYXJNb2R1bGVDb25maWcsXG4gIENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICBDYWxlbmRhclV0aWxzXG59IGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla01vZHVsZSB9IGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRheU1vZHVsZSB9IGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcblxuLyoqXG4gKiBUaGUgbWFpbiBtb2R1bGUgb2YgdGhpcyBsaWJyYXJ5LiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGVyTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XG4gKlxuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIENhbGVuZGVyTW9kdWxlLmZvclJvb3QoKVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlNb2R1bGUge31cbiAqIGBgYFxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICAgIENhbGVuZGFyTW9udGhNb2R1bGUsXG4gICAgQ2FsZW5kYXJXZWVrTW9kdWxlLFxuICAgIENhbGVuZGFyRGF5TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDYWxlbmRhck1vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDYWxlbmRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEcmFnZ2FibGVIZWxwZXIsXG4gICAgICAgIGNvbmZpZy5ldmVudFRpdGxlRm9ybWF0dGVyIHx8IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcixcbiAgICAgICAgY29uZmlnLmRhdGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICAgICAgICBjb25maWcudXRpbHMgfHwgQ2FsZW5kYXJVdGlsc1xuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2ciLCJDb21wb25lbnQiLCJJbnB1dCIsIlBvc2l0aW9uaW5nIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIkluamVjdG9yIiwiUmVuZGVyZXIyIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NvbnRhaW5lclJlZiIsIkluamVjdCIsIkRPQ1VNRU5UIiwiSG9zdExpc3RlbmVyIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwiRGF0ZVBpcGUiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlBpcGUiLCJMT0NBTEVfSUQiLCJnZXRNb250aFZpZXciLCJnZXRXZWVrVmlld0hlYWRlciIsImdldFdlZWtWaWV3IiwiZ2V0RGF5VmlldyIsImdldERheVZpZXdIb3VyR3JpZCIsIkluamVjdGFibGUiLCJJbmplY3Rpb25Ub2tlbiIsIkRyYWdnYWJsZUhlbHBlciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJ0cmlnZ2VyIiwidHJhbnNpdGlvbiIsInN0eWxlIiwiYW5pbWF0ZSIsIkRyYWdBbmREcm9wTW9kdWxlIiwiUmVzaXphYmxlTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU1PLHFCQUFNLGNBQWMsR0FBRyxVQUFDLE1BQXVCO1FBQ3BELHFCQUFNLElB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