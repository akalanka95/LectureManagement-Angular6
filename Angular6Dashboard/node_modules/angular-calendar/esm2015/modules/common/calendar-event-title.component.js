/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
export class CalendarEventTitleComponent {
}
CalendarEventTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-event-title',
                template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-view="view">
      <a
        class="cal-event-title"
        href="javascript:;"
        [innerHTML]="event.title | calendarEventTitle:view:event">
      </a>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }">
    </ng-template>
  `
            },] },
];
/** @nocollapse */
CalendarEventTitleComponent.propDecorators = {
    "event": [{ type: Input },],
    "customTemplate": [{ type: Input },],
    "view": [{ type: Input },],
};
function CalendarEventTitleComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarEventTitleComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarEventTitleComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarEventTitleComponent.propDecorators;
    /** @type {?} */
    CalendarEventTitleComponent.prototype.event;
    /** @type {?} */
    CalendarEventTitleComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarEventTitleComponent.prototype.view;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBeUI5RCxNQUFNOzs7WUF0QkwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO2FBQ0Y7Ozs7c0JBRUUsS0FBSzsrQkFFTCxLQUFLO3FCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1ldmVudD1cImV2ZW50XCJcbiAgICAgIGxldC12aWV3PVwidmlld1wiPlxuICAgICAgPGFcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtdGl0bGVcIlxuICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgW2lubmVySFRNTF09XCJldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTp2aWV3OmV2ZW50XCI+XG4gICAgICA8L2E+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIHZpZXc6IHZpZXdcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHZpZXc6IHN0cmluZztcbn1cbiJdfQ==