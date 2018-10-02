import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
export declare class CalendarOpenDayEventsComponent {
    isOpen: boolean;
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
}
