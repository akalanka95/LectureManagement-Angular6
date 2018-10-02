/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { trackByEventId } from '../common/util';
export class CalendarOpenDayEventsComponent {
    constructor() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
}
CalendarOpenDayEventsComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-open-day-events',
                template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked">
      <div
        *ngFor="let event of events; trackBy:trackByEventId"
        [ngClass]="event?.cssClass"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}">
        <span
          class="cal-event"
          [style.backgroundColor]="event.color?.primary">
        </span>
        &ngsp;
        <mwl-calendar-event-title
          [event]="event"
          [customTemplate]="eventTitleTemplate"
          view="month"
          (mwlClick)="eventClicked.emit({event: event})">
        </mwl-calendar-event-title>
        &ngsp;
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
      </div>
    </ng-template>
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <ng-template
        [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngTemplateOutletContext]="{
          events: events,
          eventClicked: eventClicked
        }">
      </ng-template>
    </div>
  `,
                animations: [
                    trigger('collapse', [
                        transition('void => *', [
                            style({ height: 0, overflow: 'hidden' }),
                            animate('150ms', style({ height: '*' }))
                        ]),
                        transition('* => void', [
                            style({ height: '*', overflow: 'hidden' }),
                            animate('150ms', style({ height: 0 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
CalendarOpenDayEventsComponent.propDecorators = {
    "isOpen": [{ type: Input },],
    "events": [{ type: Input },],
    "customTemplate": [{ type: Input },],
    "eventTitleTemplate": [{ type: Input },],
    "eventClicked": [{ type: Output },],
};
function CalendarOpenDayEventsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarOpenDayEventsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarOpenDayEventsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarOpenDayEventsComponent.propDecorators;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.isOpen;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.events;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.eventTitleTemplate;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.eventClicked;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.trackByEventId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL21vbnRoL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxRGhELE1BQU07O3NCQUN1QixLQUFLOzRCQVN1QixJQUFJLFlBQVksRUFFbkU7OEJBRWEsY0FBYzs7OztZQWpFaEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxVQUFVLEVBQUU7d0JBQ2xCLFVBQVUsQ0FBQyxXQUFXLEVBQUU7NEJBQ3RCLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDOzRCQUN4QyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3lCQUN6QyxDQUFDO3dCQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7NEJBQ3RCLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDOzRCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUN2QyxDQUFDO3FCQUNILENBQUM7aUJBQ0g7YUFDRjs7Ozt1QkFFRSxLQUFLO3VCQUVMLEtBQUs7K0JBRUwsS0FBSzttQ0FFTCxLQUFLOzZCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1ldmVudHM9XCJldmVudHNcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZXZlbnRzOyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgIFtkcm9wRGF0YV09XCJ7ZXZlbnQ6IGV2ZW50fVwiXG4gICAgICAgIFtkcmFnQXhpc109XCJ7eDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGV9XCI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiZXZlbnQuY29sb3I/LnByaW1hcnlcIj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICAmbmdzcDtcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC10aXRsZVxuICAgICAgICAgIFtldmVudF09XCJldmVudFwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgdmlldz1cIm1vbnRoXCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiBldmVudH0pXCI+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxuICAgICAgICAmbmdzcDtcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zIFtldmVudF09XCJldmVudFwiPjwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjYWwtb3Blbi1kYXktZXZlbnRzXCIgW0Bjb2xsYXBzZV0gKm5nSWY9XCJpc09wZW5cIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkXG4gICAgICAgIH1cIj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdjb2xsYXBzZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6IDAsIG92ZXJmbG93OiAnaGlkZGVuJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTUwbXMnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG92ZXJmbG93OiAnaGlkZGVuJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTUwbXMnLCBzdHlsZSh7IGhlaWdodDogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQge1xuICBASW5wdXQoKSBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXTtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xufVxuIl19