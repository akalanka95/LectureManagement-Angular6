/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { map, mergeMap, takeUntil, take, takeLast, pairwise, share, filter } from 'rxjs/operators';
import { DraggableHelper } from './draggable-helper.provider';
/**
 * @record
 */
export function Coordinates() { }
function Coordinates_tsickle_Closure_declarations() {
    /** @type {?} */
    Coordinates.prototype.x;
    /** @type {?} */
    Coordinates.prototype.y;
}
/**
 * @record
 */
export function DragAxis() { }
function DragAxis_tsickle_Closure_declarations() {
    /** @type {?} */
    DragAxis.prototype.x;
    /** @type {?} */
    DragAxis.prototype.y;
}
/**
 * @record
 */
export function SnapGrid() { }
function SnapGrid_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SnapGrid.prototype.x;
    /** @type {?|undefined} */
    SnapGrid.prototype.y;
}
/**
 * @record
 */
export function PointerEvent() { }
function PointerEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    PointerEvent.prototype.clientX;
    /** @type {?} */
    PointerEvent.prototype.clientY;
    /** @type {?} */
    PointerEvent.prototype.event;
}
const /** @type {?} */ MOVE_CURSOR = 'move';
export class DraggableDirective {
    /**
     * @hidden
     * @param {?} element
     * @param {?} renderer
     * @param {?} draggableHelper
     * @param {?} zone
     */
    constructor(element, renderer, draggableHelper, zone) {
        this.element = element;
        this.renderer = renderer;
        this.draggableHelper = draggableHelper;
        this.zone = zone;
        /**
         * The axis along which the element is draggable
         */
        this.dragAxis = { x: true, y: true };
        /**
         * Snap all drags to an x / y grid
         */
        this.dragSnapGrid = {};
        /**
         * Show a ghost element that shows the drag when dragging
         */
        this.ghostDragEnabled = true;
        /**
         * The cursor to use when dragging the element
         */
        this.dragCursor = MOVE_CURSOR;
        /**
         * Called when the element can be dragged along one axis and has the mouse or pointer device pressed on it
         */
        this.dragPointerDown = new EventEmitter();
        /**
         * Called when the element has started to be dragged.
         * Only called after at least one mouse or touch move event
         */
        this.dragStart = new EventEmitter();
        /**
         * Called when the element is being dragged
         */
        this.dragging = new EventEmitter();
        /**
         * Called after the element is dragged
         */
        this.dragEnd = new EventEmitter();
        /**
         * @hidden
         */
        this.pointerDown = new Subject();
        /**
         * @hidden
         */
        this.pointerMove = new Subject();
        /**
         * @hidden
         */
        this.pointerUp = new Subject();
        this.eventListenerSubscriptions = {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkEventListeners();
        const /** @type {?} */ pointerDrag = this.pointerDown
            .pipe(filter(() => this.canDrag()))
            .pipe(mergeMap((pointerDownEvent) => {
            const /** @type {?} */ currentDrag = new Subject();
            this.zone.run(() => {
                this.dragPointerDown.next({ x: 0, y: 0 });
            });
            const /** @type {?} */ pointerMove = this.pointerMove
                .pipe(map((pointerMoveEvent) => {
                pointerMoveEvent.event.preventDefault();
                return {
                    currentDrag,
                    x: pointerMoveEvent.clientX - pointerDownEvent.clientX,
                    y: pointerMoveEvent.clientY - pointerDownEvent.clientY,
                    clientX: pointerMoveEvent.clientX,
                    clientY: pointerMoveEvent.clientY
                };
            }))
                .pipe(map((moveData) => {
                if (this.dragSnapGrid.x) {
                    moveData.x =
                        Math.floor(moveData.x / this.dragSnapGrid.x) *
                            this.dragSnapGrid.x;
                }
                if (this.dragSnapGrid.y) {
                    moveData.y =
                        Math.floor(moveData.y / this.dragSnapGrid.y) *
                            this.dragSnapGrid.y;
                }
                return moveData;
            }))
                .pipe(map((moveData) => {
                if (!this.dragAxis.x) {
                    moveData.x = 0;
                }
                if (!this.dragAxis.y) {
                    moveData.y = 0;
                }
                return moveData;
            }))
                .pipe(filter(({ x, y }) => !this.validateDrag || this.validateDrag({ x, y })))
                .pipe(takeUntil(merge(this.pointerUp, this.pointerDown)))
                .pipe(share());
            pointerMove.pipe(take(1)).subscribe(() => {
                pointerDownEvent.event.preventDefault();
                this.zone.run(() => {
                    this.dragStart.next({ x: 0, y: 0 });
                });
                this.setCursor(this.dragCursor);
                this.draggableHelper.currentDrag.next(currentDrag);
            });
            pointerMove.pipe(takeLast(1)).subscribe(({ x, y }) => {
                this.zone.run(() => {
                    this.dragEnd.next({ x, y });
                });
                currentDrag.complete();
                this.setCssTransform('');
                if (this.ghostDragEnabled) {
                    this.renderer.setStyle(this.element.nativeElement, 'pointerEvents', '');
                }
            });
            return pointerMove;
        }))
            .pipe(share());
        merge(pointerDrag.pipe(take(1)).pipe(map(value => [, value])), pointerDrag.pipe(pairwise()))
            .pipe(filter(([previous, next]) => {
            if (!previous) {
                return true;
            }
            return previous.x !== next.x || previous.y !== next.y;
        }))
            .pipe(map(([previous, next]) => next))
            .subscribe(({ x, y, currentDrag, clientX, clientY }) => {
            this.zone.run(() => {
                this.dragging.next({ x, y });
            });
            if (this.ghostDragEnabled) {
                this.renderer.setStyle(this.element.nativeElement, 'pointerEvents', 'none');
            }
            this.setCssTransform(`translate(${x}px, ${y}px)`);
            currentDrag.next({
                clientX,
                clientY,
                dropData: this.dropData
            });
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['dragAxis']) {
            this.checkEventListeners();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeEventListeners();
        this.pointerDown.complete();
        this.pointerMove.complete();
        this.pointerUp.complete();
    }
    /**
     * @return {?}
     */
    checkEventListeners() {
        const /** @type {?} */ canDrag = this.canDrag();
        const /** @type {?} */ hasEventListeners = Object.keys(this.eventListenerSubscriptions).length > 0;
        if (canDrag && !hasEventListeners) {
            this.zone.runOutsideAngular(() => {
                this.eventListenerSubscriptions.mousedown = this.renderer.listen(this.element.nativeElement, 'mousedown', (event) => {
                    this.onMouseDown(event);
                });
                this.eventListenerSubscriptions.mouseup = this.renderer.listen('document', 'mouseup', (event) => {
                    this.onMouseUp(event);
                });
                this.eventListenerSubscriptions.touchstart = this.renderer.listen(this.element.nativeElement, 'touchstart', (event) => {
                    this.onTouchStart(event);
                });
                this.eventListenerSubscriptions.touchend = this.renderer.listen('document', 'touchend', (event) => {
                    this.onTouchEnd(event);
                });
                this.eventListenerSubscriptions.touchcancel = this.renderer.listen('document', 'touchcancel', (event) => {
                    this.onTouchEnd(event);
                });
                this.eventListenerSubscriptions.mouseenter = this.renderer.listen(this.element.nativeElement, 'mouseenter', () => {
                    this.onMouseEnter();
                });
                this.eventListenerSubscriptions.mouseleave = this.renderer.listen(this.element.nativeElement, 'mouseleave', () => {
                    this.onMouseLeave();
                });
            });
        }
        else if (!canDrag && hasEventListeners) {
            this.unsubscribeEventListeners();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        if (!this.eventListenerSubscriptions.mousemove) {
            this.eventListenerSubscriptions.mousemove = this.renderer.listen('document', 'mousemove', (mouseMoveEvent) => {
                this.pointerMove.next({
                    event: mouseMoveEvent,
                    clientX: mouseMoveEvent.clientX,
                    clientY: mouseMoveEvent.clientY
                });
            });
        }
        this.pointerDown.next({
            event,
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseUp(event) {
        if (this.eventListenerSubscriptions.mousemove) {
            this.eventListenerSubscriptions.mousemove();
            delete this.eventListenerSubscriptions.mousemove;
        }
        this.pointerUp.next({
            event,
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchStart(event) {
        if (!this.eventListenerSubscriptions.touchmove) {
            this.eventListenerSubscriptions.touchmove = this.renderer.listen('document', 'touchmove', (touchMoveEvent) => {
                this.pointerMove.next({
                    event: touchMoveEvent,
                    clientX: touchMoveEvent.targetTouches[0].clientX,
                    clientY: touchMoveEvent.targetTouches[0].clientY
                });
            });
        }
        this.pointerDown.next({
            event,
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchEnd(event) {
        if (this.eventListenerSubscriptions.touchmove) {
            this.eventListenerSubscriptions.touchmove();
            delete this.eventListenerSubscriptions.touchmove;
        }
        this.pointerUp.next({
            event,
            clientX: event.changedTouches[0].clientX,
            clientY: event.changedTouches[0].clientY
        });
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.setCursor(this.dragCursor);
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.setCursor('');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setCssTransform(value) {
        if (this.ghostDragEnabled) {
            const /** @type {?} */ transformAttributes = [
                'transform',
                '-webkit-transform',
                '-ms-transform',
                '-moz-transform',
                '-o-transform'
            ];
            transformAttributes.forEach(transformAttribute => {
                this.renderer.setStyle(this.element.nativeElement, transformAttribute, value);
            });
        }
    }
    /**
     * @return {?}
     */
    canDrag() {
        return this.dragAxis.x || this.dragAxis.y;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setCursor(value) {
        this.renderer.setStyle(this.element.nativeElement, 'cursor', value);
    }
    /**
     * @return {?}
     */
    unsubscribeEventListeners() {
        Object.keys(this.eventListenerSubscriptions).forEach(type => {
            (/** @type {?} */ (this)).eventListenerSubscriptions[type]();
            delete (/** @type {?} */ (this)).eventListenerSubscriptions[type];
        });
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlDraggable]'
            },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DraggableHelper, },
    { type: NgZone, },
];
DraggableDirective.propDecorators = {
    "dropData": [{ type: Input },],
    "dragAxis": [{ type: Input },],
    "dragSnapGrid": [{ type: Input },],
    "ghostDragEnabled": [{ type: Input },],
    "validateDrag": [{ type: Input },],
    "dragCursor": [{ type: Input },],
    "dragPointerDown": [{ type: Output },],
    "dragStart": [{ type: Output },],
    "dragging": [{ type: Output },],
    "dragEnd": [{ type: Output },],
};
function DraggableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DraggableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DraggableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DraggableDirective.propDecorators;
    /**
     * an object of data you can pass to the drop event
     * @type {?}
     */
    DraggableDirective.prototype.dropData;
    /**
     * The axis along which the element is draggable
     * @type {?}
     */
    DraggableDirective.prototype.dragAxis;
    /**
     * Snap all drags to an x / y grid
     * @type {?}
     */
    DraggableDirective.prototype.dragSnapGrid;
    /**
     * Show a ghost element that shows the drag when dragging
     * @type {?}
     */
    DraggableDirective.prototype.ghostDragEnabled;
    /**
     * Allow custom behaviour to control when the element is dragged
     * @type {?}
     */
    DraggableDirective.prototype.validateDrag;
    /**
     * The cursor to use when dragging the element
     * @type {?}
     */
    DraggableDirective.prototype.dragCursor;
    /**
     * Called when the element can be dragged along one axis and has the mouse or pointer device pressed on it
     * @type {?}
     */
    DraggableDirective.prototype.dragPointerDown;
    /**
     * Called when the element has started to be dragged.
     * Only called after at least one mouse or touch move event
     * @type {?}
     */
    DraggableDirective.prototype.dragStart;
    /**
     * Called when the element is being dragged
     * @type {?}
     */
    DraggableDirective.prototype.dragging;
    /**
     * Called after the element is dragged
     * @type {?}
     */
    DraggableDirective.prototype.dragEnd;
    /**
     * @hidden
     * @type {?}
     */
    DraggableDirective.prototype.pointerDown;
    /**
     * @hidden
     * @type {?}
     */
    DraggableDirective.prototype.pointerMove;
    /**
     * @hidden
     * @type {?}
     */
    DraggableDirective.prototype.pointerUp;
    /** @type {?} */
    DraggableDirective.prototype.eventListenerSubscriptions;
    /** @type {?} */
    DraggableDirective.prototype.element;
    /** @type {?} */
    DraggableDirective.prototype.renderer;
    /** @type {?} */
    DraggableDirective.prototype.draggableHelper;
    /** @type {?} */
    DraggableDirective.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS8iLCJzb3VyY2VzIjpbImRyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDSixRQUFRLEVBQ1IsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ1AsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QjlELHVCQUFNLFdBQVcsR0FBVyxNQUFNLENBQUM7QUFLbkMsTUFBTTs7Ozs7Ozs7SUFrRkosWUFDUyxTQUNDLFVBQ0EsaUJBQ0E7UUFIRCxZQUFPLEdBQVAsT0FBTztRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsU0FBSSxHQUFKLElBQUk7Ozs7d0JBN0VnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTs7Ozs0QkFLaEIsRUFBRTs7OztnQ0FLQyxJQUFJOzs7OzBCQVVuQixXQUFXOzs7OytCQUtMLElBQUksWUFBWSxFQUFlOzs7Ozt5QkFNckMsSUFBSSxZQUFZLEVBQWU7Ozs7d0JBS2hDLElBQUksWUFBWSxFQUFlOzs7O3VCQUtoQyxJQUFJLFlBQVksRUFBZTs7OzsyQkFLZCxJQUFJLE9BQU8sRUFBRTs7OzsyQkFLYixJQUFJLE9BQU8sRUFBRTs7Ozt5QkFLZixJQUFJLE9BQU8sRUFBRTswQ0FZNUMsRUFBRTtLQVVGOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLHVCQUFNLFdBQVcsR0FBb0IsSUFBSSxDQUFDLFdBQVc7YUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUNsQyxJQUFJLENBQ0gsUUFBUSxDQUFDLENBQUMsZ0JBQThCLEVBQUUsRUFBRTtZQUMxQyx1QkFBTSxXQUFXLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7WUFFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0MsQ0FBQyxDQUFDO1lBRUgsdUJBQU0sV0FBVyxHQUE0QixJQUFJLENBQUMsV0FBVztpQkFDMUQsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLGdCQUE4QixFQUFFLEVBQUU7Z0JBQ3JDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFeEMsTUFBTSxDQUFDO29CQUNMLFdBQVc7b0JBQ1gsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPO29CQUN0RCxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU87b0JBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPO29CQUNqQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztpQkFDbEMsQ0FBQzthQUNILENBQUMsQ0FDSDtpQkFDQSxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLFFBQVEsQ0FBQyxDQUFDO3dCQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCO2dCQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsUUFBUSxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdkI7Z0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNqQixDQUFDLENBQ0g7aUJBQ0EsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtnQkFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtnQkFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hCO2dCQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDakIsQ0FBQyxDQUNIO2lCQUNBLElBQUksQ0FDSCxNQUFNLENBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDaEUsQ0FDRjtpQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVqQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BELENBQUMsQ0FBQztZQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QixDQUFDLENBQUM7Z0JBQ0gsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLGVBQWUsRUFDZixFQUFFLENBQ0gsQ0FBQztpQkFDSDthQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDcEIsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFakIsS0FBSyxDQUNILFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3ZELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDN0I7YUFDRSxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdkQsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5QixDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLGVBQWUsRUFDZixNQUFNLENBQ1AsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsT0FBTztnQkFDUCxPQUFPO2dCQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDTjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRU8sbUJBQW1CO1FBQ3pCLHVCQUFNLE9BQU8sR0FBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsdUJBQU0saUJBQWlCLEdBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQixXQUFXLEVBQ1gsQ0FBQyxLQUFpQixFQUFFLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM1RCxVQUFVLEVBQ1YsU0FBUyxFQUNULENBQUMsS0FBaUIsRUFBRSxFQUFFO29CQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2QixDQUNGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLFlBQVksRUFDWixDQUFDLEtBQWlCLEVBQUUsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUIsQ0FDRixDQUFDO2dCQUVGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQzdELFVBQVUsRUFDVixVQUFVLEVBQ1YsQ0FBQyxLQUFpQixFQUFFLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNoRSxVQUFVLEVBQ1YsYUFBYSxFQUNiLENBQUMsS0FBaUIsRUFBRSxFQUFFO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QixDQUNGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLFlBQVksRUFDWixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQixDQUNGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLFlBQVksRUFDWixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQixDQUNGLENBQUM7YUFDSCxDQUFDLENBQUM7U0FDSjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7Ozs7OztJQUdLLFdBQVcsQ0FBQyxLQUFpQjtRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQzlELFVBQVUsRUFDVixXQUFXLEVBQ1gsQ0FBQyxjQUEwQixFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPO29CQUMvQixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU87aUJBQ2hDLENBQUMsQ0FBQzthQUNKLENBQ0YsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsS0FBSztZQUNMLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDOzs7Ozs7SUFHRyxTQUFTLENBQUMsS0FBaUI7UUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLEtBQUs7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQzs7Ozs7O0lBR0csWUFBWSxDQUFDLEtBQWlCO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDOUQsVUFBVSxFQUNWLFdBQVcsRUFDWCxDQUFDLGNBQTBCLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3BCLEtBQUssRUFBRSxjQUFjO29CQUNyQixPQUFPLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO29CQUNoRCxPQUFPLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO2lCQUNqRCxDQUFDLENBQUM7YUFDSixDQUNGLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUs7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ2pDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDbEMsQ0FBQyxDQUFDOzs7Ozs7SUFHRyxVQUFVLENBQUMsS0FBaUI7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLEtBQUs7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDekMsQ0FBQyxDQUFDOzs7OztJQUdHLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7O0lBRzFCLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBR2IsZUFBZSxDQUFDLEtBQWE7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQix1QkFBTSxtQkFBbUIsR0FBRztnQkFDMUIsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixjQUFjO2FBQ2YsQ0FBQztZQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLGtCQUFrQixFQUNsQixLQUFLLENBQ04sQ0FBQzthQUNILENBQUMsQ0FBQztTQUNKOzs7OztJQUdLLE9BQU87UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUdwQyxTQUFTLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRzlELHlCQUF5QjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxRCxtQkFBQyxJQUFXLEVBQUMsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pELE9BQU8sbUJBQUMsSUFBVyxFQUFDLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkQsQ0FBQyxDQUFDOzs7O1lBeFpOLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7O1lBbERDLFVBQVU7WUFDVixTQUFTO1lBb0JGLGVBQWU7WUFkdEIsTUFBTTs7O3lCQWdETCxLQUFLO3lCQUtMLEtBQUs7NkJBS0wsS0FBSztpQ0FLTCxLQUFLOzZCQUtMLEtBQUs7MkJBS0wsS0FBSztnQ0FLTCxNQUFNOzBCQU1OLE1BQU07eUJBS04sTUFBTTt3QkFLTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uQ2hhbmdlcyxcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG4gIHRha2VVbnRpbCxcbiAgdGFrZSxcbiAgdGFrZUxhc3QsXG4gIHBhaXJ3aXNlLFxuICBzaGFyZSxcbiAgZmlsdGVyXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJy4vZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29vcmRpbmF0ZXMge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcmFnQXhpcyB7XG4gIHg6IGJvb2xlYW47XG4gIHk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU25hcEdyaWQge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0ZURyYWcgPSAoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKSA9PiBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50ZXJFdmVudCB7XG4gIGNsaWVudFg6IG51bWJlcjtcbiAgY2xpZW50WTogbnVtYmVyO1xuICBldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQ7XG59XG5cbmNvbnN0IE1PVkVfQ1VSU09SOiBzdHJpbmcgPSAnbW92ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xEcmFnZ2FibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIGFuIG9iamVjdCBvZiBkYXRhIHlvdSBjYW4gcGFzcyB0byB0aGUgZHJvcCBldmVudFxuICAgKi9cbiAgQElucHV0KCkgZHJvcERhdGE6IGFueTtcblxuICAvKipcbiAgICogVGhlIGF4aXMgYWxvbmcgd2hpY2ggdGhlIGVsZW1lbnQgaXMgZHJhZ2dhYmxlXG4gICAqL1xuICBASW5wdXQoKSBkcmFnQXhpczogRHJhZ0F4aXMgPSB7IHg6IHRydWUsIHk6IHRydWUgfTtcblxuICAvKipcbiAgICogU25hcCBhbGwgZHJhZ3MgdG8gYW4geCAvIHkgZ3JpZFxuICAgKi9cbiAgQElucHV0KCkgZHJhZ1NuYXBHcmlkOiBTbmFwR3JpZCA9IHt9O1xuXG4gIC8qKlxuICAgKiBTaG93IGEgZ2hvc3QgZWxlbWVudCB0aGF0IHNob3dzIHRoZSBkcmFnIHdoZW4gZHJhZ2dpbmdcbiAgICovXG4gIEBJbnB1dCgpIGdob3N0RHJhZ0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBbGxvdyBjdXN0b20gYmVoYXZpb3VyIHRvIGNvbnRyb2wgd2hlbiB0aGUgZWxlbWVudCBpcyBkcmFnZ2VkXG4gICAqL1xuICBASW5wdXQoKSB2YWxpZGF0ZURyYWc6IFZhbGlkYXRlRHJhZztcblxuICAvKipcbiAgICogVGhlIGN1cnNvciB0byB1c2Ugd2hlbiBkcmFnZ2luZyB0aGUgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgZHJhZ0N1cnNvciA9IE1PVkVfQ1VSU09SO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBjYW4gYmUgZHJhZ2dlZCBhbG9uZyBvbmUgYXhpcyBhbmQgaGFzIHRoZSBtb3VzZSBvciBwb2ludGVyIGRldmljZSBwcmVzc2VkIG9uIGl0XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ1BvaW50ZXJEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxDb29yZGluYXRlcz4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIHN0YXJ0ZWQgdG8gYmUgZHJhZ2dlZC5cbiAgICogT25seSBjYWxsZWQgYWZ0ZXIgYXQgbGVhc3Qgb25lIG1vdXNlIG9yIHRvdWNoIG1vdmUgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBiZWluZyBkcmFnZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGVsZW1lbnQgaXMgZHJhZ2dlZFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwb2ludGVyRG93bjogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcG9pbnRlck1vdmU6IFN1YmplY3Q8UG9pbnRlckV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHBvaW50ZXJVcDogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zOiB7XG4gICAgbW91c2Vtb3ZlPzogKCkgPT4gdm9pZDtcbiAgICBtb3VzZWRvd24/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNldXA/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlZW50ZXI/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlbGVhdmU/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNoc3RhcnQ/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNobW92ZT86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hlbmQ/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNoY2FuY2VsPzogKCkgPT4gdm9pZDtcbiAgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVIZWxwZXI6IERyYWdnYWJsZUhlbHBlcixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBjb25zdCBwb2ludGVyRHJhZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5wb2ludGVyRG93blxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuY2FuRHJhZygpKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgocG9pbnRlckRvd25FdmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudERyYWc6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1BvaW50ZXJEb3duLm5leHQoeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgcG9pbnRlck1vdmU6IE9ic2VydmFibGU8Q29vcmRpbmF0ZXM+ID0gdGhpcy5wb2ludGVyTW92ZVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocG9pbnRlck1vdmVFdmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcG9pbnRlck1vdmVFdmVudC5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnREcmFnLFxuICAgICAgICAgICAgICAgICAgeDogcG9pbnRlck1vdmVFdmVudC5jbGllbnRYIC0gcG9pbnRlckRvd25FdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgeTogcG9pbnRlck1vdmVFdmVudC5jbGllbnRZIC0gcG9pbnRlckRvd25FdmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WDogcG9pbnRlck1vdmVFdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WTogcG9pbnRlck1vdmVFdmVudC5jbGllbnRZXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKG1vdmVEYXRhOiBDb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTbmFwR3JpZC54KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS54ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihtb3ZlRGF0YS54IC8gdGhpcy5kcmFnU25hcEdyaWQueCkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdTbmFwR3JpZC54O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTbmFwR3JpZC55KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS55ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihtb3ZlRGF0YS55IC8gdGhpcy5kcmFnU25hcEdyaWQueSkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdTbmFwR3JpZC55O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlRGF0YTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKG1vdmVEYXRhOiBDb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnQXhpcy54KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS54ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ0F4aXMueSkge1xuICAgICAgICAgICAgICAgICAgbW92ZURhdGEueSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVEYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAoeyB4LCB5IH0pID0+ICF0aGlzLnZhbGlkYXRlRHJhZyB8fCB0aGlzLnZhbGlkYXRlRHJhZyh7IHgsIHkgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1lcmdlKHRoaXMucG9pbnRlclVwLCB0aGlzLnBvaW50ZXJEb3duKSkpXG4gICAgICAgICAgICAucGlwZShzaGFyZSgpKTtcblxuICAgICAgICAgIHBvaW50ZXJNb3ZlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHBvaW50ZXJEb3duRXZlbnQuZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0Lm5leHQoeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29yKHRoaXMuZHJhZ0N1cnNvcik7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlSGVscGVyLmN1cnJlbnREcmFnLm5leHQoY3VycmVudERyYWcpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9pbnRlck1vdmUucGlwZSh0YWtlTGFzdCgxKSkuc3Vic2NyaWJlKCh7IHgsIHkgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0VuZC5uZXh0KHsgeCwgeSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3VycmVudERyYWcuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3NzVHJhbnNmb3JtKCcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmdob3N0RHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAncG9pbnRlckV2ZW50cycsXG4gICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBwb2ludGVyTW92ZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKHNoYXJlKCkpO1xuXG4gICAgbWVyZ2UoXG4gICAgICBwb2ludGVyRHJhZy5waXBlKHRha2UoMSkpLnBpcGUobWFwKHZhbHVlID0+IFssIHZhbHVlXSkpLFxuICAgICAgcG9pbnRlckRyYWcucGlwZShwYWlyd2lzZSgpKVxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKFtwcmV2aW91cywgbmV4dF0pID0+IHtcbiAgICAgICAgICBpZiAoIXByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzLnggIT09IG5leHQueCB8fCBwcmV2aW91cy55ICE9PSBuZXh0Lnk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShtYXAoKFtwcmV2aW91cywgbmV4dF0pID0+IG5leHQpKVxuICAgICAgLnN1YnNjcmliZSgoeyB4LCB5LCBjdXJyZW50RHJhZywgY2xpZW50WCwgY2xpZW50WSB9KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhZ2dpbmcubmV4dCh7IHgsIHkgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5naG9zdERyYWdFbmFibGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3BvaW50ZXJFdmVudHMnLFxuICAgICAgICAgICAgJ25vbmUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldENzc1RyYW5zZm9ybShgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWApO1xuICAgICAgICBjdXJyZW50RHJhZy5uZXh0KHtcbiAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgZHJvcERhdGE6IHRoaXMuZHJvcERhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snZHJhZ0F4aXMnXSkge1xuICAgICAgdGhpcy5jaGVja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5wb2ludGVyRG93bi5jb21wbGV0ZSgpO1xuICAgIHRoaXMucG9pbnRlck1vdmUuY29tcGxldGUoKTtcbiAgICB0aGlzLnBvaW50ZXJVcC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0V2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbkRyYWc6IGJvb2xlYW4gPSB0aGlzLmNhbkRyYWcoKTtcbiAgICBjb25zdCBoYXNFdmVudExpc3RlbmVyczogYm9vbGVhbiA9XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zKS5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGNhbkRyYWcgJiYgIWhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlZG93biA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bihldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2V1cCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgJ21vdXNldXAnLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNoc3RhcnQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hTdGFydChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hlbmQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICd0b3VjaGVuZCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNoY2FuY2VsID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAndG91Y2hjYW5jZWwnLFxuICAgICAgICAgIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoRW5kKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZWVudGVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZUVudGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2VsZWF2ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtb3VzZWxlYXZlJyxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VMZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIWNhbkRyYWcgJiYgaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgKG1vdXNlTW92ZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5wb2ludGVyTW92ZS5uZXh0KHtcbiAgICAgICAgICAgIGV2ZW50OiBtb3VzZU1vdmVFdmVudCxcbiAgICAgICAgICAgIGNsaWVudFg6IG1vdXNlTW92ZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZOiBtb3VzZU1vdmVFdmVudC5jbGllbnRZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlckRvd24ubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VVcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZW1vdmUoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyVXAubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgICAodG91Y2hNb3ZlRXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlLm5leHQoe1xuICAgICAgICAgICAgZXZlbnQ6IHRvdWNoTW92ZUV2ZW50LFxuICAgICAgICAgICAgY2xpZW50WDogdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgY2xpZW50WTogdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlckRvd24ubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNobW92ZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlO1xuICAgIH1cbiAgICB0aGlzLnBvaW50ZXJVcC5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q3Vyc29yKHRoaXMuZHJhZ0N1cnNvcik7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEN1cnNvcignJyk7XG4gIH1cblxuICBwcml2YXRlIHNldENzc1RyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ2hvc3REcmFnRW5hYmxlZCkge1xuICAgICAgY29uc3QgdHJhbnNmb3JtQXR0cmlidXRlcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICctd2Via2l0LXRyYW5zZm9ybScsXG4gICAgICAgICctbXMtdHJhbnNmb3JtJyxcbiAgICAgICAgJy1tb3otdHJhbnNmb3JtJyxcbiAgICAgICAgJy1vLXRyYW5zZm9ybSdcbiAgICAgIF07XG4gICAgICB0cmFuc2Zvcm1BdHRyaWJ1dGVzLmZvckVhY2godHJhbnNmb3JtQXR0cmlidXRlID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICB0cmFuc2Zvcm1BdHRyaWJ1dGUsXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FuRHJhZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnQXhpcy54IHx8IHRoaXMuZHJhZ0F4aXMueTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3Vyc29yKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMpLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAodGhpcyBhcyBhbnkpLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zW3R5cGVdKCk7XG4gICAgICBkZWxldGUgKHRoaXMgYXMgYW55KS5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9uc1t0eXBlXTtcbiAgICB9KTtcbiAgfVxufVxuIl19