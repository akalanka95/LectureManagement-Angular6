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
 */
CalendarEventTitleFormatter = /** @class */ (function () {
    function CalendarEventTitleFormatter() {
    }
    /**
     * The month view event title.
     */
    /**
       * The month view event title.
       */
    CalendarEventTitleFormatter.prototype.month = /**
       * The month view event title.
       */
    function (event) {
        return event.title;
    };
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    /**
       * The month view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    CalendarEventTitleFormatter.prototype.monthTooltip = /**
       * The month view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    function (event) {
        return event.title;
    };
    /**
     * The week view event title.
     */
    /**
       * The week view event title.
       */
    CalendarEventTitleFormatter.prototype.week = /**
       * The week view event title.
       */
    function (event) {
        return event.title;
    };
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    /**
       * The week view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    CalendarEventTitleFormatter.prototype.weekTooltip = /**
       * The week view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    function (event) {
        return event.title;
    };
    /**
     * The day view event title.
     */
    /**
       * The day view event title.
       */
    CalendarEventTitleFormatter.prototype.day = /**
       * The day view event title.
       */
    function (event) {
        return event.title;
    };
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    /**
       * The day view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    CalendarEventTitleFormatter.prototype.dayTooltip = /**
       * The day view event tooltip. Return a falsey value from this to disable the tooltip.
       */
    function (event) {
        return event.title;
    };
    return CalendarEventTitleFormatter;
}());
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
export { CalendarEventTitleFormatter };
//# sourceMappingURL=calendar-event-title-formatter.provider.js.map