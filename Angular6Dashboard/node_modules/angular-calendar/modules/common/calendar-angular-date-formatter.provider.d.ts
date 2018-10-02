import { CalendarDateFormatterInterface, DateFormatterParams } from './calendar-date-formatter.interface';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
export declare class CalendarAngularDateFormatter implements CalendarDateFormatterInterface {
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({date, locale}: DateFormatterParams): string;
    /**
     * The month view cell day number
     */
    monthViewDayNumber({date, locale}: DateFormatterParams): string;
    /**
     * The month view title
     */
    monthViewTitle({date, locale}: DateFormatterParams): string;
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({date, locale}: DateFormatterParams): string;
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({date, locale}: DateFormatterParams): string;
    /**
     * The week view title
     */
    weekViewTitle({date, locale}: DateFormatterParams): string;
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({date, locale}: DateFormatterParams): string;
    /**
     * The day view title
     */
    dayViewTitle({date, locale}: DateFormatterParams): string;
}
