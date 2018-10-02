import { CalendarEvent, WeekDay } from 'calendar-utils';
export declare const validateEvents: (events: CalendarEvent<any>[]) => boolean;
export declare function isInside(outer: ClientRect, inner: ClientRect): boolean;
export declare const trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
export declare const trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
export declare const trackByIndex: (index: number) => number;
