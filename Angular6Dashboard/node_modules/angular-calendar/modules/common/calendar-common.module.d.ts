import { ModuleWithProviders, Provider } from '@angular/core';
export interface CalendarModuleConfig {
    eventTitleFormatter?: Provider;
    dateFormatter?: Provider;
    utils?: Provider;
}
export * from './calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter.provider';
export * from './calendar-utils.provider';
export * from './calendar-date-formatter.interface';
export * from './calendar-event-times-changed-event.interface';
export { CalendarEvent, EventAction as CalendarEventAction, DAYS_OF_WEEK, ViewPeriod as CalendarViewPeriod } from 'calendar-utils';
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule } from 'angular-calendar/modules/common';
 * import { CalendarMonthModule } from 'angular-calendar/modules/month';
 *
 * @NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
export declare class CalendarCommonModule {
    static forRoot(config?: CalendarModuleConfig): ModuleWithProviders;
}
