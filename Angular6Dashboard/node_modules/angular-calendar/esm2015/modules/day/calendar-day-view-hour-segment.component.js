/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
export class CalendarDayViewHourSegmentComponent {
}
CalendarDayViewHourSegmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view-hour-segment',
                template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale">
      <div
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.date | calendarDate:'dayViewHour':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
    </ng-template>
  `
            },] },
];
/** @nocollapse */
CalendarDayViewHourSegmentComponent.propDecorators = {
    "segment": [{ type: Input },],
    "segmentHeight": [{ type: Input },],
    "locale": [{ type: Input },],
    "customTemplate": [{ type: Input },],
};
function CalendarDayViewHourSegmentComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarDayViewHourSegmentComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarDayViewHourSegmentComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarDayViewHourSegmentComponent.propDecorators;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.segment;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.segmentHeight;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.locale;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.customTemplate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2RheS9jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUE4QjlELE1BQU07OztZQTNCTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7O3dCQUVFLEtBQUs7OEJBRUwsS0FBSzt1QkFFTCxLQUFLOytCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF5Vmlld0hvdXJTZWdtZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1zZWdtZW50PVwic2VnbWVudFwiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWhvdXItc2VnbWVudFwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwic2VnbWVudEhlaWdodFwiXG4gICAgICAgIFtjbGFzcy5jYWwtaG91ci1zdGFydF09XCJzZWdtZW50LmlzU3RhcnRcIlxuICAgICAgICBbY2xhc3MuY2FsLWFmdGVyLWhvdXItc3RhcnRdPVwiIXNlZ21lbnQuaXNTdGFydFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInNlZ21lbnQuY3NzQ2xhc3NcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10aW1lXCI+XG4gICAgICAgICAge3sgc2VnbWVudC5kYXRlIHwgY2FsZW5kYXJEYXRlOidkYXlWaWV3SG91cic6bG9jYWxlIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBzZWdtZW50OiBzZWdtZW50LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZVxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3SG91clNlZ21lbnRDb21wb25lbnQge1xuICBASW5wdXQoKSBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnQ7XG5cbiAgQElucHV0KCkgc2VnbWVudEhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuIl19