import { Subject, merge } from 'rxjs';
import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input, NgZone, NgModule } from '@angular/core';
import { map, mergeMap, takeUntil, take, takeLast, pairwise, share, filter, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DraggableHelper {
    constructor() {
        this.currentDrag = new Subject();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ MOVE_CURSOR = 'move';
class DraggableDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} clientX
 * @param {?} clientY
 * @param {?} rect
 * @return {?}
 */
function isCoordinateWithinRectangle(clientX, clientY, rect) {
    return (clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom);
}
class DroppableDirective {
    /**
     * @param {?} element
     * @param {?} draggableHelper
     * @param {?} zone
     */
    constructor(element, draggableHelper, zone) {
        this.element = element;
        this.draggableHelper = draggableHelper;
        this.zone = zone;
        /**
         * Called when a draggable element starts overlapping the element
         */
        this.dragEnter = new EventEmitter();
        /**
         * Called when a draggable element stops overlapping the element
         */
        this.dragLeave = new EventEmitter();
        /**
         * Called when a draggable element is moved over the element
         */
        this.dragOver = new EventEmitter();
        /**
         * Called when a draggable element is dropped on this element
         */
        this.drop = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.currentDragSubscription = this.draggableHelper.currentDrag.subscribe((drag) => {
            const /** @type {?} */ droppableRectangle = this.element.nativeElement.getBoundingClientRect();
            let /** @type {?} */ currentDragDropData;
            const /** @type {?} */ overlaps = drag.pipe(map(({ clientX, clientY, dropData }) => {
                currentDragDropData = dropData;
                return isCoordinateWithinRectangle(clientX, clientY, droppableRectangle);
            }));
            const /** @type {?} */ overlapsChanged = overlaps.pipe(distinctUntilChanged());
            let /** @type {?} */ dragOverActive; // TODO - see if there's a way of doing this via rxjs
            overlapsChanged
                .pipe(filter(overlapsNow => overlapsNow))
                .subscribe(() => {
                dragOverActive = true;
                this.zone.run(() => {
                    this.dragEnter.next({
                        dropData: currentDragDropData
                    });
                });
            });
            overlaps.pipe(filter(overlapsNow => overlapsNow)).subscribe(() => {
                this.zone.run(() => {
                    this.dragOver.next({
                        dropData: currentDragDropData
                    });
                });
            });
            overlapsChanged
                .pipe(pairwise())
                .pipe(filter(([didOverlap, overlapsNow]) => didOverlap && !overlapsNow))
                .subscribe(() => {
                dragOverActive = false;
                this.zone.run(() => {
                    this.dragLeave.next({
                        dropData: currentDragDropData
                    });
                });
            });
            drag.pipe(mergeMap(() => overlaps)).subscribe({
                complete: () => {
                    if (dragOverActive) {
                        this.zone.run(() => {
                            this.drop.next({
                                dropData: currentDragDropData
                            });
                        });
                    }
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.currentDragSubscription.unsubscribe();
    }
}
DroppableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlDroppable]'
            },] },
];
/** @nocollapse */
DroppableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: DraggableHelper, },
    { type: NgZone, },
];
DroppableDirective.propDecorators = {
    "dragEnter": [{ type: Output },],
    "dragLeave": [{ type: Output },],
    "dragOver": [{ type: Output },],
    "drop": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DragAndDropModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: DragAndDropModule,
            providers: [DraggableHelper]
        };
    }
}
DragAndDropModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DraggableDirective, DroppableDirective],
                exports: [DraggableDirective, DroppableDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DragAndDropModule, DraggableHelper, DraggableDirective as ɵa, DroppableDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS9kcm9wcGFibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZy1hbmQtZHJvcC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlSGVscGVyIHtcbiAgY3VycmVudERyYWc6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBOZ1pvbmUsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgbWFwLFxuICBtZXJnZU1hcCxcbiAgdGFrZVVudGlsLFxuICB0YWtlLFxuICB0YWtlTGFzdCxcbiAgcGFpcndpc2UsXG4gIHNoYXJlLFxuICBmaWx0ZXJcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBDb29yZGluYXRlcyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYWdBeGlzIHtcbiAgeDogYm9vbGVhbjtcbiAgeTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbmFwR3JpZCB7XG4gIHg/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRlRHJhZyA9IChjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnRlckV2ZW50IHtcbiAgY2xpZW50WDogbnVtYmVyO1xuICBjbGllbnRZOiBudW1iZXI7XG4gIGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudDtcbn1cblxuY29uc3QgTU9WRV9DVVJTT1I6IHN0cmluZyA9ICdtb3ZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bERyYWdnYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogYW4gb2JqZWN0IG9mIGRhdGEgeW91IGNhbiBwYXNzIHRvIHRoZSBkcm9wIGV2ZW50XG4gICAqL1xuICBASW5wdXQoKSBkcm9wRGF0YTogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgYXhpcyBhbG9uZyB3aGljaCB0aGUgZWxlbWVudCBpcyBkcmFnZ2FibGVcbiAgICovXG4gIEBJbnB1dCgpIGRyYWdBeGlzOiBEcmFnQXhpcyA9IHsgeDogdHJ1ZSwgeTogdHJ1ZSB9O1xuXG4gIC8qKlxuICAgKiBTbmFwIGFsbCBkcmFncyB0byBhbiB4IC8geSBncmlkXG4gICAqL1xuICBASW5wdXQoKSBkcmFnU25hcEdyaWQ6IFNuYXBHcmlkID0ge307XG5cbiAgLyoqXG4gICAqIFNob3cgYSBnaG9zdCBlbGVtZW50IHRoYXQgc2hvd3MgdGhlIGRyYWcgd2hlbiBkcmFnZ2luZ1xuICAgKi9cbiAgQElucHV0KCkgZ2hvc3REcmFnRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEFsbG93IGN1c3RvbSBiZWhhdmlvdXIgdG8gY29udHJvbCB3aGVuIHRoZSBlbGVtZW50IGlzIGRyYWdnZWRcbiAgICovXG4gIEBJbnB1dCgpIHZhbGlkYXRlRHJhZzogVmFsaWRhdGVEcmFnO1xuXG4gIC8qKlxuICAgKiBUaGUgY3Vyc29yIHRvIHVzZSB3aGVuIGRyYWdnaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSBkcmFnQ3Vyc29yID0gTU9WRV9DVVJTT1I7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGNhbiBiZSBkcmFnZ2VkIGFsb25nIG9uZSBheGlzIGFuZCBoYXMgdGhlIG1vdXNlIG9yIHBvaW50ZXIgZGV2aWNlIHByZXNzZWQgb24gaXRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnUG9pbnRlckRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgc3RhcnRlZCB0byBiZSBkcmFnZ2VkLlxuICAgKiBPbmx5IGNhbGxlZCBhZnRlciBhdCBsZWFzdCBvbmUgbW91c2Ugb3IgdG91Y2ggbW92ZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGJlaW5nIGRyYWdnZWRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciB0aGUgZWxlbWVudCBpcyBkcmFnZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHBvaW50ZXJEb3duOiBTdWJqZWN0PFBvaW50ZXJFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwb2ludGVyTW92ZTogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcG9pbnRlclVwOiBTdWJqZWN0PFBvaW50ZXJFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnM6IHtcbiAgICBtb3VzZW1vdmU/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlZG93bj86ICgpID0+IHZvaWQ7XG4gICAgbW91c2V1cD86ICgpID0+IHZvaWQ7XG4gICAgbW91c2VlbnRlcj86ICgpID0+IHZvaWQ7XG4gICAgbW91c2VsZWF2ZT86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hzdGFydD86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2htb3ZlPzogKCkgPT4gdm9pZDtcbiAgICB0b3VjaGVuZD86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hjYW5jZWw/OiAoKSA9PiB2b2lkO1xuICB9ID0ge307XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRyYWdnYWJsZUhlbHBlcjogRHJhZ2dhYmxlSGVscGVyLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIGNvbnN0IHBvaW50ZXJEcmFnOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnBvaW50ZXJEb3duXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5jYW5EcmFnKCkpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChwb2ludGVyRG93bkV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50RHJhZzogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnUG9pbnRlckRvd24ubmV4dCh7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBwb2ludGVyTW92ZTogT2JzZXJ2YWJsZTxDb29yZGluYXRlcz4gPSB0aGlzLnBvaW50ZXJNb3ZlXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwb2ludGVyTW92ZUV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBwb2ludGVyTW92ZUV2ZW50LmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgY3VycmVudERyYWcsXG4gICAgICAgICAgICAgICAgICB4OiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFggLSBwb2ludGVyRG93bkV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICB5OiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFkgLSBwb2ludGVyRG93bkV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICBjbGllbnRYOiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICBjbGllbnRZOiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgobW92ZURhdGE6IENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1NuYXBHcmlkLngpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnggPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKG1vdmVEYXRhLnggLyB0aGlzLmRyYWdTbmFwR3JpZC54KSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1NuYXBHcmlkLng7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1NuYXBHcmlkLnkpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnkgPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKG1vdmVEYXRhLnkgLyB0aGlzLmRyYWdTbmFwR3JpZC55KSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1NuYXBHcmlkLnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVEYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgobW92ZURhdGE6IENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWdBeGlzLngpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnggPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnQXhpcy55KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS55ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbW92ZURhdGE7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICh7IHgsIHkgfSkgPT4gIXRoaXMudmFsaWRhdGVEcmFnIHx8IHRoaXMudmFsaWRhdGVEcmFnKHsgeCwgeSB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwobWVyZ2UodGhpcy5wb2ludGVyVXAsIHRoaXMucG9pbnRlckRvd24pKSlcbiAgICAgICAgICAgIC5waXBlKHNoYXJlKCkpO1xuXG4gICAgICAgICAgcG9pbnRlck1vdmUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgcG9pbnRlckRvd25FdmVudC5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnQubmV4dCh7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3IodGhpcy5kcmFnQ3Vyc29yKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVIZWxwZXIuY3VycmVudERyYWcubmV4dChjdXJyZW50RHJhZyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwb2ludGVyTW92ZS5waXBlKHRha2VMYXN0KDEpKS5zdWJzY3JpYmUoKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnRW5kLm5leHQoeyB4LCB5IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50RHJhZy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRDc3NUcmFuc2Zvcm0oJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2hvc3REcmFnRW5hYmxlZCkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICdwb2ludGVyRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHBvaW50ZXJNb3ZlO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoc2hhcmUoKSk7XG5cbiAgICBtZXJnZShcbiAgICAgIHBvaW50ZXJEcmFnLnBpcGUodGFrZSgxKSkucGlwZShtYXAodmFsdWUgPT4gWywgdmFsdWVdKSksXG4gICAgICBwb2ludGVyRHJhZy5waXBlKHBhaXJ3aXNlKCkpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoW3ByZXZpb3VzLCBuZXh0XSkgPT4ge1xuICAgICAgICAgIGlmICghcHJldmlvdXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJldmlvdXMueCAhPT0gbmV4dC54IHx8IHByZXZpb3VzLnkgIT09IG5leHQueTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKG1hcCgoW3ByZXZpb3VzLCBuZXh0XSkgPT4gbmV4dCkpXG4gICAgICAuc3Vic2NyaWJlKCh7IHgsIHksIGN1cnJlbnREcmFnLCBjbGllbnRYLCBjbGllbnRZIH0pID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmFnZ2luZy5uZXh0KHsgeCwgeSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmdob3N0RHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAncG9pbnRlckV2ZW50cycsXG4gICAgICAgICAgICAnbm9uZSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0Q3NzVHJhbnNmb3JtKGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYCk7XG4gICAgICAgIGN1cnJlbnREcmFnLm5leHQoe1xuICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICBkcm9wRGF0YTogdGhpcy5kcm9wRGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydkcmFnQXhpcyddKSB7XG4gICAgICB0aGlzLmNoZWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnBvaW50ZXJEb3duLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5wb2ludGVyTW92ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMucG9pbnRlclVwLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgY29uc3QgY2FuRHJhZzogYm9vbGVhbiA9IHRoaXMuY2FuRHJhZygpO1xuICAgIGNvbnN0IGhhc0V2ZW50TGlzdGVuZXJzOiBib29sZWFuID1cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoY2FuRHJhZyAmJiAhaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vkb3duID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlZG93bicsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZXVwID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hzdGFydCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaFN0YXJ0KGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaGVuZCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgJ3RvdWNoZW5kJyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaEVuZChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hjYW5jZWwgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICd0b3VjaGNhbmNlbCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlZW50ZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAnbW91c2VlbnRlcicsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZWxlYXZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlbGVhdmUnLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZUxlYXZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY2FuRHJhZyAmJiBoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgdGhpcy51bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZW1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAobW91c2VNb3ZlRXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlLm5leHQoe1xuICAgICAgICAgICAgZXZlbnQ6IG1vdXNlTW92ZUV2ZW50LFxuICAgICAgICAgICAgY2xpZW50WDogbW91c2VNb3ZlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFk6IG1vdXNlTW92ZUV2ZW50LmNsaWVudFlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyRG93bi5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlO1xuICAgIH1cbiAgICB0aGlzLnBvaW50ZXJVcC5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNobW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgJ3RvdWNobW92ZScsXG4gICAgICAgICh0b3VjaE1vdmVFdmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucG9pbnRlck1vdmUubmV4dCh7XG4gICAgICAgICAgICBldmVudDogdG91Y2hNb3ZlRXZlbnQsXG4gICAgICAgICAgICBjbGllbnRYOiB0b3VjaE1vdmVFdmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZOiB0b3VjaE1vdmVFdmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyRG93bi5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgY2xpZW50WTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlKCk7XG4gICAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmU7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlclVwLm5leHQoe1xuICAgICAgZXZlbnQsXG4gICAgICBjbGllbnRYOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgY2xpZW50WTogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDdXJzb3IodGhpcy5kcmFnQ3Vyc29yKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q3Vyc29yKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3NzVHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5naG9zdERyYWdFbmFibGVkKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1BdHRyaWJ1dGVzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nLFxuICAgICAgICAnLW1vei10cmFuc2Zvcm0nLFxuICAgICAgICAnLW8tdHJhbnNmb3JtJ1xuICAgICAgXTtcbiAgICAgIHRyYW5zZm9ybUF0dHJpYnV0ZXMuZm9yRWFjaCh0cmFuc2Zvcm1BdHRyaWJ1dGUgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIHRyYW5zZm9ybUF0dHJpYnV0ZSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5EcmFnKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdBeGlzLnggfHwgdGhpcy5kcmFnQXhpcy55O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXJzb3IodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucykuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICh0aGlzIGFzIGFueSkuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnNbdHlwZV0oKTtcbiAgICAgIGRlbGV0ZSAodGhpcyBhcyBhbnkpLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zW3R5cGVdO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgcGFpcndpc2UsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBtZXJnZU1hcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnZ2FibGVIZWxwZXIgfSBmcm9tICcuL2RyYWdnYWJsZS1oZWxwZXIucHJvdmlkZXInO1xuXG5mdW5jdGlvbiBpc0Nvb3JkaW5hdGVXaXRoaW5SZWN0YW5nbGUoXG4gIGNsaWVudFg6IG51bWJlcixcbiAgY2xpZW50WTogbnVtYmVyLFxuICByZWN0OiBDbGllbnRSZWN0XG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBjbGllbnRYID49IHJlY3QubGVmdCAmJlxuICAgIGNsaWVudFggPD0gcmVjdC5yaWdodCAmJlxuICAgIGNsaWVudFkgPj0gcmVjdC50b3AgJiZcbiAgICBjbGllbnRZIDw9IHJlY3QuYm90dG9tXG4gICk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcERhdGEge1xuICBkcm9wRGF0YTogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsRHJvcHBhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBzdGFydHMgb3ZlcmxhcHBpbmcgdGhlIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IHN0b3BzIG92ZXJsYXBwaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0xlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBpcyBtb3ZlZCBvdmVyIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ092ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IGlzIGRyb3BwZWQgb24gdGhpcyBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgY3VycmVudERyYWdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVIZWxwZXI6IERyYWdnYWJsZUhlbHBlcixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaW50ZXJmYWNlIEN1cnJlbnREcmFnRGF0YSB7XG4gICAgICBjbGllbnRYOiBudW1iZXI7XG4gICAgICBjbGllbnRZOiBudW1iZXI7XG4gICAgICBkcm9wRGF0YTogYW55O1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudERyYWdTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdnYWJsZUhlbHBlci5jdXJyZW50RHJhZy5zdWJzY3JpYmUoXG4gICAgICAoZHJhZzogU3ViamVjdDxDdXJyZW50RHJhZ0RhdGE+KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3BwYWJsZVJlY3RhbmdsZTogQ2xpZW50UmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BEYXRhOiBhbnk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXBzID0gZHJhZy5waXBlKFxuICAgICAgICAgIG1hcCgoeyBjbGllbnRYLCBjbGllbnRZLCBkcm9wRGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50RHJhZ0Ryb3BEYXRhID0gZHJvcERhdGE7XG4gICAgICAgICAgICByZXR1cm4gaXNDb29yZGluYXRlV2l0aGluUmVjdGFuZ2xlKFxuICAgICAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgICAgICBjbGllbnRZLFxuICAgICAgICAgICAgICBkcm9wcGFibGVSZWN0YW5nbGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBvdmVybGFwc0NoYW5nZWQgPSBvdmVybGFwcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgICAgIGxldCBkcmFnT3ZlckFjdGl2ZTogYm9vbGVhbjsgLy8gVE9ETyAtIHNlZSBpZiB0aGVyZSdzIGEgd2F5IG9mIGRvaW5nIHRoaXMgdmlhIHJ4anNcblxuICAgICAgICBvdmVybGFwc0NoYW5nZWRcbiAgICAgICAgICAucGlwZShmaWx0ZXIob3ZlcmxhcHNOb3cgPT4gb3ZlcmxhcHNOb3cpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgZHJhZ092ZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyLm5leHQoe1xuICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgb3ZlcmxhcHMucGlwZShmaWx0ZXIob3ZlcmxhcHNOb3cgPT4gb3ZlcmxhcHNOb3cpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlci5uZXh0KHtcbiAgICAgICAgICAgICAgZHJvcERhdGE6IGN1cnJlbnREcmFnRHJvcERhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGFwc0NoYW5nZWRcbiAgICAgICAgICAucGlwZShwYWlyd2lzZSgpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChbZGlkT3ZlcmxhcCwgb3ZlcmxhcHNOb3ddKSA9PiBkaWRPdmVybGFwICYmICFvdmVybGFwc05vdylcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBkcmFnT3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlLm5leHQoe1xuICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgZHJhZy5waXBlKG1lcmdlTWFwKCgpID0+IG92ZXJsYXBzKSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRyYWdPdmVyQWN0aXZlKSB7XG4gICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcC5uZXh0KHtcbiAgICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudERyYWdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0RyYWdnYWJsZUhlbHBlcl1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7MkJBRzhCLElBQUksT0FBTyxFQUFFOztDQUMxQzs7Ozs7O0FDSkQsQUFpREEsdUJBQU0sV0FBVyxHQUFXLE1BQU0sQ0FBQztBQUtuQzs7Ozs7Ozs7SUFrRkUsWUFDUyxTQUNDLFVBQ0EsaUJBQ0E7UUFIRCxZQUFPLEdBQVAsT0FBTztRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsU0FBSSxHQUFKLElBQUk7Ozs7d0JBN0VnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTs7Ozs0QkFLaEIsRUFBRTs7OztnQ0FLQyxJQUFJOzs7OzBCQVVuQixXQUFXOzs7OytCQUtMLElBQUksWUFBWSxFQUFlOzs7Ozt5QkFNckMsSUFBSSxZQUFZLEVBQWU7Ozs7d0JBS2hDLElBQUksWUFBWSxFQUFlOzs7O3VCQUtoQyxJQUFJLFlBQVksRUFBZTs7OzsyQkFLZCxJQUFJLE9BQU8sRUFBRTs7OzsyQkFLYixJQUFJLE9BQU8sRUFBRTs7Ozt5QkFLZixJQUFJLE9BQU8sRUFBRTswQ0FZNUMsRUFBRTtLQVVGOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLHVCQUFNLFdBQVcsR0FBb0IsSUFBSSxDQUFDLFdBQVc7YUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDLElBQUksQ0FDSCxRQUFRLENBQUMsQ0FBQyxnQkFBOEI7WUFDdEMsdUJBQU0sV0FBVyxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBRWhELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7WUFFSCx1QkFBTSxXQUFXLEdBQTRCLElBQUksQ0FBQyxXQUFXO2lCQUMxRCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsZ0JBQThCO2dCQUNqQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXhDLE9BQU87b0JBQ0wsV0FBVztvQkFDWCxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU87b0JBQ3RELENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTztvQkFDdEQsT0FBTyxFQUFFLGdCQUFnQixDQUFDLE9BQU87b0JBQ2pDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPO2lCQUNsQyxDQUFDO2FBQ0gsQ0FBQyxDQUNIO2lCQUNBLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxRQUFxQjtnQkFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtvQkFDdkIsUUFBUSxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdkI7Z0JBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtvQkFDdkIsUUFBUSxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdkI7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFDakIsQ0FBQyxDQUNIO2lCQUNBLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxRQUFxQjtnQkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO29CQUNwQixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO29CQUNwQixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEI7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFDakIsQ0FBQyxDQUNIO2lCQUNBLElBQUksQ0FDSCxNQUFNLENBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNoRSxDQUNGO2lCQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRWpCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDckMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDcEQsQ0FBQyxDQUFDO1lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzdCLENBQUMsQ0FBQztnQkFDSCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLGVBQWUsRUFDZixFQUFFLENBQ0gsQ0FBQztpQkFDSDthQUNGLENBQUMsQ0FBQztZQUVILE9BQU8sV0FBVyxDQUFDO1NBQ3BCLENBQUMsQ0FDSDthQUNBLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLEtBQUssQ0FDSCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUN2RCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQzdCO2FBQ0UsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdkQsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLGVBQWUsRUFDZixNQUFNLENBQ1AsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsT0FBTztnQkFDUCxPQUFPO2dCQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDTjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVPLG1CQUFtQjtRQUN6Qix1QkFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLHVCQUFNLGlCQUFpQixHQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFMUQsSUFBSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUMxQixJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsV0FBVyxFQUNYLENBQUMsS0FBaUI7b0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM1RCxVQUFVLEVBQ1YsU0FBUyxFQUNULENBQUMsS0FBaUI7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3ZCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsWUFBWSxFQUNaLENBQUMsS0FBaUI7b0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM3RCxVQUFVLEVBQ1YsVUFBVSxFQUNWLENBQUMsS0FBaUI7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNoRSxVQUFVLEVBQ1YsYUFBYSxFQUNiLENBQUMsS0FBaUI7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsWUFBWSxFQUNaO29CQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDckIsQ0FDRixDQUFDO2dCQUVGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQixZQUFZLEVBQ1o7b0JBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQixDQUNGLENBQUM7YUFDSCxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksQ0FBQyxPQUFPLElBQUksaUJBQWlCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7Ozs7OztJQUdLLFdBQVcsQ0FBQyxLQUFpQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM5RCxVQUFVLEVBQ1YsV0FBVyxFQUNYLENBQUMsY0FBMEI7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPO29CQUMvQixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU87aUJBQ2hDLENBQUMsQ0FBQzthQUNKLENBQ0YsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsS0FBSztZQUNMLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDOzs7Ozs7SUFHRyxTQUFTLENBQUMsS0FBaUI7UUFDakMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxFQUFFO1lBQzdDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixLQUFLO1lBQ0wsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7Ozs7OztJQUdHLFlBQVksQ0FBQyxLQUFpQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUM5RCxVQUFVLEVBQ1YsV0FBVyxFQUNYLENBQUMsY0FBMEI7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztvQkFDaEQsT0FBTyxFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztpQkFDakQsQ0FBQyxDQUFDO2FBQ0osQ0FDRixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixLQUFLO1lBQ0wsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNqQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1NBQ2xDLENBQUMsQ0FBQzs7Ozs7O0lBR0csVUFBVSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRTtZQUM3QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDNUMsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDbEIsS0FBSztZQUNMLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDeEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7Ozs7O0lBR0csWUFBWTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7SUFHMUIsWUFBWTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHYixlQUFlLENBQUMsS0FBYTtRQUNuQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6Qix1QkFBTSxtQkFBbUIsR0FBRztnQkFDMUIsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixjQUFjO2FBQ2YsQ0FBQztZQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0I7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsa0JBQWtCLEVBQ2xCLEtBQUssQ0FDTixDQUFDO2FBQ0gsQ0FBQyxDQUFDO1NBQ0o7Ozs7O0lBR0ssT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUdwQyxTQUFTLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRzlELHlCQUF5QjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3ZELG1CQUFDLElBQVcsR0FBRSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pELE9BQU8sbUJBQUMsSUFBVyxHQUFFLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZELENBQUMsQ0FBQzs7OztZQXhaTixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQWxEQyxVQUFVO1lBQ1YsU0FBUztZQW9CRixlQUFlO1lBZHRCLE1BQU07Ozt5QkFnREwsS0FBSzt5QkFLTCxLQUFLOzZCQUtMLEtBQUs7aUNBS0wsS0FBSzs2QkFLTCxLQUFLOzJCQUtMLEtBQUs7Z0NBS0wsTUFBTTswQkFNTixNQUFNO3lCQUtOLE1BQU07d0JBS04sTUFBTTs7Ozs7OztBQ3hHVDs7Ozs7O0FBbUJBLHFDQUNFLE9BQWUsRUFDZixPQUFlLEVBQ2YsSUFBZ0I7SUFFaEIsUUFDRSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUk7UUFDcEIsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRztRQUNuQixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDdEI7Q0FDSDs7Ozs7OztJQWdDQyxZQUNVLFNBQ0EsaUJBQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTztRQUNQLG9CQUFlLEdBQWYsZUFBZTtRQUNmLFNBQUksR0FBSixJQUFJOzs7O3lCQXRCUSxJQUFJLFlBQVksRUFBWTs7Ozt5QkFLNUIsSUFBSSxZQUFZLEVBQVk7Ozs7d0JBSzdCLElBQUksWUFBWSxFQUFZOzs7O29CQUtoQyxJQUFJLFlBQVksRUFBWTtLQVF6Qzs7OztJQUVKLFFBQVE7UUFPTixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUN2RSxDQUFDLElBQThCO1lBQzdCLHVCQUFNLGtCQUFrQixHQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFMUYscUJBQUksbUJBQXdCLENBQUM7WUFDN0IsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ3hCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7Z0JBQ2pDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztnQkFDL0IsT0FBTywyQkFBMkIsQ0FDaEMsT0FBTyxFQUNQLE9BQU8sRUFDUCxrQkFBa0IsQ0FDbkIsQ0FBQzthQUNILENBQUMsQ0FDSCxDQUFDO1lBRUYsdUJBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1lBRTlELHFCQUFJLGNBQXVCLENBQUM7WUFFNUIsZUFBZTtpQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQztpQkFDeEMsU0FBUyxDQUFDO2dCQUNULGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO3dCQUNsQixRQUFRLEVBQUUsbUJBQW1CO3FCQUM5QixDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBRUwsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDakIsUUFBUSxFQUFFLG1CQUFtQjtxQkFDOUIsQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUVILGVBQWU7aUJBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNoQixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2xFO2lCQUNBLFNBQVMsQ0FBQztnQkFDVCxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDbEIsUUFBUSxFQUFFLG1CQUFtQjtxQkFDOUIsQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUVMLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVDLFFBQVEsRUFBRTtvQkFDUixJQUFJLGNBQWMsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ2IsUUFBUSxFQUFFLG1CQUFtQjs2QkFDOUIsQ0FBQyxDQUFDO3lCQUNKLENBQUMsQ0FBQztxQkFDSjtpQkFDRjthQUNGLENBQUMsQ0FBQztTQUNKLENBQ0YsQ0FBQztLQUNIOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM1Qzs7O1lBN0dGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7O1lBbkNDLFVBQVU7WUFjSCxlQUFlO1lBVnRCLE1BQU07OzswQkFvQ0wsTUFBTTswQkFLTixNQUFNO3lCQUtOLE1BQU07cUJBS04sTUFBTTs7Ozs7OztBQzFEVDs7OztJQVVFLE9BQU8sT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztTQUM3QixDQUFDO0tBQ0g7OztZQVZGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQztnQkFDdEQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7YUFDbEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==