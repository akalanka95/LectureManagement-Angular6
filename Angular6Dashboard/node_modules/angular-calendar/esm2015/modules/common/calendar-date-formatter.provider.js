/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CalendarAngularDateFormatter } from './calendar-angular-date-formatter.provider';
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
export class CalendarDateFormatter extends CalendarAngularDateFormatter {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEIxRixNQUFNLDRCQUE2QixTQUFRLDRCQUE0QjtDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgYWxsIGZvcm1hdHRpbmcgb2YgZGF0ZXMuIFRoZXJlIGFyZSAzIGltcGxlbWVudGF0aW9ucyBhdmFpbGFibGUsIHRoZSBgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlcmAgKGRlZmF1bHQpIHdoaWNoIHVzZXMgdGhlIGFuZ3VsYXIgZGF0ZSBwaXBlIHRvIGZvcm1hdCBkYXRlcywgdGhlIGBDYWxlbmRhck5hdGl2ZURhdGVGb3JtYXR0ZXJgIHdoaWNoIHdpbGwgdXNlIHRoZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bFwiIHRhcmdldD1cIl9ibGFua1wiPkludGw8L2E+IEFQSSB0byBmb3JtYXQgZGF0ZXMsIG9yIHRoZXJlIGlzIHRoZSBgQ2FsZW5kYXJNb21lbnREYXRlRm9ybWF0dGVyYCB3aGljaCB1c2VzIDxhIGhyZWY9XCJodHRwOi8vbW9tZW50anMuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPm1vbWVudDwvYT4uXG4gKlxuICogSWYgeW91IHdpc2gsIHlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIHRoZSBkZWZhdWx0cyB2aWEgYW5ndWxhcnMgREkuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgRGF0ZUZvcm1hdHRlclBhcmFtcyB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICogaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuICpcbiAqIGNsYXNzIEN1c3RvbURhdGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIge1xuICpcbiAqICAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7ZGF0ZSwgbG9jYWxlfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnRUVFJywgbG9jYWxlKTsgLy8gdXNlIHNob3J0IHdlZWsgZGF5c1xuICogICB9XG4gKlxuICogfVxuICpcbiAqIC8vIGluIHlvdXIgY29tcG9uZW50IHRoYXQgdXNlcyB0aGUgY2FsZW5kYXJcbiAqIHByb3ZpZGVyczogW3tcbiAqICAgcHJvdmlkZTogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICogICB1c2VDbGFzczogQ3VzdG9tRGF0ZUZvcm1hdHRlclxuICogfV1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIGV4dGVuZHMgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB7fVxuIl19