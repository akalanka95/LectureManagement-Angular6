import { GetMonthViewArgs, MonthView, GetWeekViewHeaderArgs, WeekDay, GetWeekViewArgs, GetDayViewArgs, DayView, GetDayViewHourGridArgs, DayViewHour, WeekView } from 'calendar-utils';
export declare class CalendarUtils {
    getMonthView(args: GetMonthViewArgs): MonthView;
    getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[];
    getWeekView(args: GetWeekViewArgs): WeekView;
    getDayView(args: GetDayViewArgs): DayView;
    getDayViewHourGrid(args: GetDayViewHourGridArgs): DayViewHour[];
}
