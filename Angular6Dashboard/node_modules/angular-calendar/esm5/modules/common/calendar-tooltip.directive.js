/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Component, HostListener, Input, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject, Renderer2, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Positioning } from 'positioning';
var CalendarTooltipWindowComponent = /** @class */ (function () {
    function CalendarTooltipWindowComponent() {
    }
    CalendarTooltipWindowComponent.decorators = [
        { type: Component, args: [{
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\">\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarTooltipWindowComponent.propDecorators = {
        "contents": [{ type: Input },],
        "placement": [{ type: Input },],
        "event": [{ type: Input },],
        "customTemplate": [{ type: Input },],
    };
    return CalendarTooltipWindowComponent;
}());
export { CalendarTooltipWindowComponent };
function CalendarTooltipWindowComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarTooltipWindowComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarTooltipWindowComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarTooltipWindowComponent.propDecorators;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.contents;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.placement;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.event;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.customTemplate;
}
var CalendarTooltipDirective = /** @class */ (function () {
    function CalendarTooltipDirective(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document //tslint:disable-line
         = document;
        this.placement = 'top';
        this.positioning = new Positioning();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOver = /**
     * @return {?}
     */
    function () {
        this.show();
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOut = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.placement = this.placement;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame(function () {
                _this.positionTooltip();
            });
        }
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.positionTooltip = /**
     * @return {?}
     */
    function () {
        if (this.tooltipRef) {
            var /** @type {?} */ targetPosition = this.positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            var /** @type {?} */ elm = this.tooltipRef.location.nativeElement
                .children[0];
            this.renderer.setStyle(elm, 'top', targetPosition.top + "px");
            this.renderer.setStyle(elm, 'left', targetPosition.left + "px");
        }
    };
    CalendarTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarTooltip]'
                },] },
    ];
    /** @nocollapse */
    CalendarTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
        { type: Renderer2, },
        { type: ComponentFactoryResolver, },
        { type: ViewContainerRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    CalendarTooltipDirective.propDecorators = {
        "contents": [{ type: Input, args: ['mwlCalendarTooltip',] },],
        "placement": [{ type: Input, args: ['tooltipPlacement',] },],
        "customTemplate": [{ type: Input, args: ['tooltipTemplate',] },],
        "event": [{ type: Input, args: ['tooltipEvent',] },],
        "appendToBody": [{ type: Input, args: ['tooltipAppendToBody',] },],
        "onMouseOver": [{ type: HostListener, args: ['mouseenter',] },],
        "onMouseOut": [{ type: HostListener, args: ['mouseleave',] },],
    };
    return CalendarTooltipDirective;
}());
export { CalendarTooltipDirective };
function CalendarTooltipDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CalendarTooltipDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CalendarTooltipDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CalendarTooltipDirective.propDecorators;
    /** @type {?} */
    CalendarTooltipDirective.prototype.contents;
    /** @type {?} */
    CalendarTooltipDirective.prototype.placement;
    /** @type {?} */
    CalendarTooltipDirective.prototype.customTemplate;
    /** @type {?} */
    CalendarTooltipDirective.prototype.event;
    /** @type {?} */
    CalendarTooltipDirective.prototype.appendToBody;
    /** @type {?} */
    CalendarTooltipDirective.prototype.tooltipFactory;
    /** @type {?} */
    CalendarTooltipDirective.prototype.tooltipRef;
    /** @type {?} */
    CalendarTooltipDirective.prototype.positioning;
    /** @type {?} */
    CalendarTooltipDirective.prototype.elementRef;
    /** @type {?} */
    CalendarTooltipDirective.prototype.injector;
    /** @type {?} */
    CalendarTooltipDirective.prototype.renderer;
    /** @type {?} */
    CalendarTooltipDirective.prototype.viewContainerRef;
    /** @type {?} */
    CalendarTooltipDirective.prototype.document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBRUwsUUFBUSxFQUNSLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUVWLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztnQkFHekMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrbUJBbUJUO2lCQUNGOzs7OzZCQUVFLEtBQUs7OEJBRUwsS0FBSzswQkFFTCxLQUFLO21DQUVMLEtBQUs7O3lDQWpEUjs7U0EwQ2EsOEJBQThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0QnpDLGtDQUNVLFlBQ0EsVUFDQSxVQUNSLHdCQUFrRCxFQUMxQyxrQkFDa0IsU0FBUyxxQkFBcUI7OztRQUxoRCxlQUFVLEdBQVYsVUFBVTtRQUNWLGFBQVEsR0FBUixRQUFRO1FBQ1IsYUFBUSxHQUFSLFFBQVE7UUFFUixxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ0UsYUFBUSxDQUFDLHFCQUFxQjtXQUE5QixRQUFRO3lCQWxCVyxLQUFLOzJCQVVqQixJQUFJLFdBQVcsRUFBRTtRQVVsRCxJQUFJLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDLHVCQUF1QixDQUNwRSw4QkFBOEIsQ0FDL0IsQ0FBQztLQUNIOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2I7Ozs7SUFHRCw4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dUIzQixZQUFZLFNBQUMsWUFBWTsrQkFLekIsWUFBWSxTQUFDLFlBQVk7O21DQTVGNUI7O1NBdURhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0b3IsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUG9zaXRpb25pbmcgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1jb250ZW50cz1cImNvbnRlbnRzXCJcbiAgICAgIGxldC1wbGFjZW1lbnQ9XCJwbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50PVwiZXZlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcFwiIFtuZ0NsYXNzXT1cIidjYWwtdG9vbHRpcC0nICsgcGxhY2VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXAtaW5uZXJcIiBbaW5uZXJIdG1sXT1cImNvbnRlbnRzXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbnRlbnRzOiBjb250ZW50cyxcbiAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50OiBldmVudFxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY29udGVudHM6IHN0cmluZztcblxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyVG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnbXdsQ2FsZW5kYXJUb29sdGlwJykgY29udGVudHM6IHN0cmluZzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBQbGFjZW1lbnQnKSBwbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcFRlbXBsYXRlJykgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwRXZlbnQnKSBldmVudDogQ2FsZW5kYXJFdmVudDsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBBcHBlbmRUb0JvZHknKSBhcHBlbmRUb0JvZHk6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgcHJpdmF0ZSB0b29sdGlwRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQ+O1xuICBwcml2YXRlIHRvb2x0aXBSZWY6IENvbXBvbmVudFJlZjxDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQ+O1xuICBwcml2YXRlIHBvc2l0aW9uaW5nOiBQb3NpdGlvbmluZyA9IG5ldyBQb3NpdGlvbmluZygpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQgLy90c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICkge1xuICAgIHRoaXMudG9vbHRpcEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFJlZiAmJiB0aGlzLmNvbnRlbnRzKSB7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLnRvb2x0aXBGYWN0b3J5LFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLmluamVjdG9yLFxuICAgICAgICBbXVxuICAgICAgKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQ7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY3VzdG9tVGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmV2ZW50ID0gdGhpcy5ldmVudDtcbiAgICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblRvb2x0aXAoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaG9zdFZpZXcpXG4gICAgICApO1xuICAgICAgdGhpcy50b29sdGlwUmVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBvc2l0aW9uVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbjogQ2xpZW50UmVjdCA9IHRoaXMucG9zaXRpb25pbmcucG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMudG9vbHRpcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLFxuICAgICAgICB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgdGhpcy5hcHBlbmRUb0JvZHlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGVsbTogSFRNTEVsZW1lbnQgPSB0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudFxuICAgICAgICAuY2hpbGRyZW5bMF07XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxtLCAndG9wJywgYCR7dGFyZ2V0UG9zaXRpb24udG9wfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsbSwgJ2xlZnQnLCBgJHt0YXJnZXRQb3NpdGlvbi5sZWZ0fXB4YCk7XG4gICAgfVxuICB9XG59XG4iXX0=