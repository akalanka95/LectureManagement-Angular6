/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import getISOWeek from 'date-fns/get_iso_week/index';
/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
export class CalendarNativeDateFormatter {
    /**
     * The month view header week day labels
     * @param {?} __0
     * @return {?}
     */
    monthViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    monthViewDayNumber({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
    }
    /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    monthViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }
    /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnSubHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short'
        }).format(date);
    }
    /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    weekViewTitle({ date, locale }) {
        const /** @type {?} */ year = new Intl.DateTimeFormat(locale, {
            year: 'numeric'
        }).format(date);
        const /** @type {?} */ weekNumber = getISOWeek(date);
        return `Week ${weekNumber} of ${year}`;
    }
    /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    dayViewHour({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    }
    /**
     * The day view title
     * @param {?} __0
     * @return {?}
     */
    dayViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }).format(date);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbmF0aXZlLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLW5hdGl2ZS1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7Ozs7OztBQU9yRCxNQUFNOzs7Ozs7SUFLRyxxQkFBcUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQXVCO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTXBFLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBdUI7UUFDN0QsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFNbkUsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBdUI7UUFDekQsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFNWCxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQXVCO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTXBFLHVCQUF1QixDQUFDLEVBQzdCLElBQUksRUFDSixNQUFNLEVBQ2M7UUFDcEIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDckMsR0FBRyxFQUFFLFNBQVM7WUFDZCxLQUFLLEVBQUUsT0FBTztTQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFNWCxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUF1QjtRQUN4RCx1QkFBTSxJQUFJLEdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUNuRCxJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLHVCQUFNLFVBQVUsR0FBVyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLFFBQVEsVUFBVSxPQUFPLElBQUksRUFBRSxDQUFDOzs7Ozs7O0lBTWxDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQXVCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTXBFLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQXVCO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3JDLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0NBRW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlLFxuICBEYXRlRm9ybWF0dGVyUGFyYW1zXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCBnZXRJU09XZWVrIGZyb20gJ2RhdGUtZm5zL2dldF9pc29fd2Vlay9pbmRleCc7XG5cbi8qKlxuICogVGhpcyB3aWxsIHVzZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bFwiIHRhcmdldD1cIl9ibGFua1wiPkludGw8L2E+IEFQSSB0byBkbyBhbGwgZGF0ZSBmb3JtYXR0aW5nLlxuICpcbiAqIFlvdSB3aWxsIG5lZWQgdG8gaW5jbHVkZSBhIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYW5keWVhcm5zaGF3L0ludGwuanMvXCI+cG9seWZpbGw8L2E+IGZvciBvbGRlciBicm93c2Vycy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyTmF0aXZlRGF0ZUZvcm1hdHRlclxuICBpbXBsZW1lbnRzIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3Q29sdW1uSGVhZGVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBjZWxsIGRheSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdEYXlOdW1iZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyBkYXk6ICdudW1lcmljJyB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7XG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJ2xvbmcnXG4gICAgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uSGVhZGVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHN1YiBoZWFkZXIgZGF5IGFuZCBtb250aCBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7XG4gICAgZGF0ZSxcbiAgICBsb2NhbGVcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJ3Nob3J0J1xuICAgIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICBjb25zdCB5ZWFyOiBzdHJpbmcgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIHllYXI6ICdudW1lcmljJ1xuICAgIH0pLmZvcm1hdChkYXRlKTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyOiBudW1iZXIgPSBnZXRJU09XZWVrKGRhdGUpO1xuICAgIHJldHVybiBgV2VlayAke3dlZWtOdW1iZXJ9IG9mICR7eWVhcn1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGZvcm1hdHRpbmcgZG93biB0aGUgbGVmdCBoYW5kIHNpZGUgb2YgdGhlIGRheSB2aWV3XG4gICAqL1xuICBwdWJsaWMgZGF5Vmlld0hvdXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyBob3VyOiAnbnVtZXJpYycgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIGRheVZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7XG4gICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICB3ZWVrZGF5OiAnbG9uZydcbiAgICB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cbn1cbiJdfQ==