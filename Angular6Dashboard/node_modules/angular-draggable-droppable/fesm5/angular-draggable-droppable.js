import { Subject, merge } from 'rxjs';
import { __read } from 'tslib';
import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input, NgZone, NgModule } from '@angular/core';
import { map, mergeMap, takeUntil, take, takeLast, pairwise, share, filter, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DraggableHelper = /** @class */ (function () {
    function DraggableHelper() {
        this.currentDrag = new Subject();
    }
    return DraggableHelper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ MOVE_CURSOR = 'move';
var DraggableDirective = /** @class */ (function () {
    /**
     * @hidden
     */
    function DraggableDirective(element, renderer, draggableHelper, zone) {
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
    DraggableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.checkEventListeners();
        var /** @type {?} */ pointerDrag = this.pointerDown
            .pipe(filter(function () { return _this.canDrag(); }))
            .pipe(mergeMap(function (pointerDownEvent) {
            var /** @type {?} */ currentDrag = new Subject();
            _this.zone.run(function () {
                _this.dragPointerDown.next({ x: 0, y: 0 });
            });
            var /** @type {?} */ pointerMove = _this.pointerMove
                .pipe(map(function (pointerMoveEvent) {
                pointerMoveEvent.event.preventDefault();
                return {
                    currentDrag: currentDrag,
                    x: pointerMoveEvent.clientX - pointerDownEvent.clientX,
                    y: pointerMoveEvent.clientY - pointerDownEvent.clientY,
                    clientX: pointerMoveEvent.clientX,
                    clientY: pointerMoveEvent.clientY
                };
            }))
                .pipe(map(function (moveData) {
                if (_this.dragSnapGrid.x) {
                    moveData.x =
                        Math.floor(moveData.x / _this.dragSnapGrid.x) *
                            _this.dragSnapGrid.x;
                }
                if (_this.dragSnapGrid.y) {
                    moveData.y =
                        Math.floor(moveData.y / _this.dragSnapGrid.y) *
                            _this.dragSnapGrid.y;
                }
                return moveData;
            }))
                .pipe(map(function (moveData) {
                if (!_this.dragAxis.x) {
                    moveData.x = 0;
                }
                if (!_this.dragAxis.y) {
                    moveData.y = 0;
                }
                return moveData;
            }))
                .pipe(filter(function (_a) {
                var x = _a.x, y = _a.y;
                return !_this.validateDrag || _this.validateDrag({ x: x, y: y });
            }))
                .pipe(takeUntil(merge(_this.pointerUp, _this.pointerDown)))
                .pipe(share());
            pointerMove.pipe(take(1)).subscribe(function () {
                pointerDownEvent.event.preventDefault();
                _this.zone.run(function () {
                    _this.dragStart.next({ x: 0, y: 0 });
                });
                _this.setCursor(_this.dragCursor);
                _this.draggableHelper.currentDrag.next(currentDrag);
            });
            pointerMove.pipe(takeLast(1)).subscribe(function (_a) {
                var x = _a.x, y = _a.y;
                _this.zone.run(function () {
                    _this.dragEnd.next({ x: x, y: y });
                });
                currentDrag.complete();
                _this.setCssTransform('');
                if (_this.ghostDragEnabled) {
                    _this.renderer.setStyle(_this.element.nativeElement, 'pointerEvents', '');
                }
            });
            return pointerMove;
        }))
            .pipe(share());
        merge(pointerDrag.pipe(take(1)).pipe(map(function (value) { return [, value]; })), pointerDrag.pipe(pairwise()))
            .pipe(filter(function (_a) {
            var _b = __read(_a, 2), previous = _b[0], next = _b[1];
            if (!previous) {
                return true;
            }
            return previous.x !== next.x || previous.y !== next.y;
        }))
            .pipe(map(function (_a) {
            var _b = __read(_a, 2), previous = _b[0], next = _b[1];
            return next;
        }))
            .subscribe(function (_a) {
            var x = _a.x, y = _a.y, currentDrag = _a.currentDrag, clientX = _a.clientX, clientY = _a.clientY;
            _this.zone.run(function () {
                _this.dragging.next({ x: x, y: y });
            });
            if (_this.ghostDragEnabled) {
                _this.renderer.setStyle(_this.element.nativeElement, 'pointerEvents', 'none');
            }
            _this.setCssTransform("translate(" + x + "px, " + y + "px)");
            currentDrag.next({
                clientX: clientX,
                clientY: clientY,
                dropData: _this.dropData
            });
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DraggableDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['dragAxis']) {
            this.checkEventListeners();
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeEventListeners();
        this.pointerDown.complete();
        this.pointerMove.complete();
        this.pointerUp.complete();
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.checkEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ canDrag = this.canDrag();
        var /** @type {?} */ hasEventListeners = Object.keys(this.eventListenerSubscriptions).length > 0;
        if (canDrag && !hasEventListeners) {
            this.zone.runOutsideAngular(function () {
                _this.eventListenerSubscriptions.mousedown = _this.renderer.listen(_this.element.nativeElement, 'mousedown', function (event) {
                    _this.onMouseDown(event);
                });
                _this.eventListenerSubscriptions.mouseup = _this.renderer.listen('document', 'mouseup', function (event) {
                    _this.onMouseUp(event);
                });
                _this.eventListenerSubscriptions.touchstart = _this.renderer.listen(_this.element.nativeElement, 'touchstart', function (event) {
                    _this.onTouchStart(event);
                });
                _this.eventListenerSubscriptions.touchend = _this.renderer.listen('document', 'touchend', function (event) {
                    _this.onTouchEnd(event);
                });
                _this.eventListenerSubscriptions.touchcancel = _this.renderer.listen('document', 'touchcancel', function (event) {
                    _this.onTouchEnd(event);
                });
                _this.eventListenerSubscriptions.mouseenter = _this.renderer.listen(_this.element.nativeElement, 'mouseenter', function () {
                    _this.onMouseEnter();
                });
                _this.eventListenerSubscriptions.mouseleave = _this.renderer.listen(_this.element.nativeElement, 'mouseleave', function () {
                    _this.onMouseLeave();
                });
            });
        }
        else if (!canDrag && hasEventListeners) {
            this.unsubscribeEventListeners();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.eventListenerSubscriptions.mousemove) {
            this.eventListenerSubscriptions.mousemove = this.renderer.listen('document', 'mousemove', function (mouseMoveEvent) {
                _this.pointerMove.next({
                    event: mouseMoveEvent,
                    clientX: mouseMoveEvent.clientX,
                    clientY: mouseMoveEvent.clientY
                });
            });
        }
        this.pointerDown.next({
            event: event,
            clientX: event.clientX,
            clientY: event.clientY
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.eventListenerSubscriptions.mousemove) {
            this.eventListenerSubscriptions.mousemove();
            delete this.eventListenerSubscriptions.mousemove;
        }
        this.pointerUp.next({
            event: event,
            clientX: event.clientX,
            clientY: event.clientY
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onTouchStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.eventListenerSubscriptions.touchmove) {
            this.eventListenerSubscriptions.touchmove = this.renderer.listen('document', 'touchmove', function (touchMoveEvent) {
                _this.pointerMove.next({
                    event: touchMoveEvent,
                    clientX: touchMoveEvent.targetTouches[0].clientX,
                    clientY: touchMoveEvent.targetTouches[0].clientY
                });
            });
        }
        this.pointerDown.next({
            event: event,
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onTouchEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.eventListenerSubscriptions.touchmove) {
            this.eventListenerSubscriptions.touchmove();
            delete this.eventListenerSubscriptions.touchmove;
        }
        this.pointerUp.next({
            event: event,
            clientX: event.changedTouches[0].clientX,
            clientY: event.changedTouches[0].clientY
        });
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.setCursor(this.dragCursor);
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.setCursor('');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DraggableDirective.prototype.setCssTransform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.ghostDragEnabled) {
            var /** @type {?} */ transformAttributes = [
                'transform',
                '-webkit-transform',
                '-ms-transform',
                '-moz-transform',
                '-o-transform'
            ];
            transformAttributes.forEach(function (transformAttribute) {
                _this.renderer.setStyle(_this.element.nativeElement, transformAttribute, value);
            });
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.canDrag = /**
     * @return {?}
     */
    function () {
        return this.dragAxis.x || this.dragAxis.y;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DraggableDirective.prototype.setCursor = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setStyle(this.element.nativeElement, 'cursor', value);
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.unsubscribeEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.eventListenerSubscriptions).forEach(function (type) {
            (/** @type {?} */ (_this)).eventListenerSubscriptions[type]();
            delete (/** @type {?} */ (_this)).eventListenerSubscriptions[type];
        });
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: DraggableHelper, },
        { type: NgZone, },
    ]; };
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
    return DraggableDirective;
}());

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
var DroppableDirective = /** @class */ (function () {
    function DroppableDirective(element, draggableHelper, zone) {
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
    DroppableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentDragSubscription = this.draggableHelper.currentDrag.subscribe(function (drag) {
            var /** @type {?} */ droppableRectangle = _this.element.nativeElement.getBoundingClientRect();
            var /** @type {?} */ currentDragDropData;
            var /** @type {?} */ overlaps = drag.pipe(map(function (_a) {
                var clientX = _a.clientX, clientY = _a.clientY, dropData = _a.dropData;
                currentDragDropData = dropData;
                return isCoordinateWithinRectangle(clientX, clientY, droppableRectangle);
            }));
            var /** @type {?} */ overlapsChanged = overlaps.pipe(distinctUntilChanged());
            var /** @type {?} */ dragOverActive; // TODO - see if there's a way of doing this via rxjs
            overlapsChanged
                .pipe(filter(function (overlapsNow) { return overlapsNow; }))
                .subscribe(function () {
                dragOverActive = true;
                _this.zone.run(function () {
                    _this.dragEnter.next({
                        dropData: currentDragDropData
                    });
                });
            });
            overlaps.pipe(filter(function (overlapsNow) { return overlapsNow; })).subscribe(function () {
                _this.zone.run(function () {
                    _this.dragOver.next({
                        dropData: currentDragDropData
                    });
                });
            });
            overlapsChanged
                .pipe(pairwise())
                .pipe(filter(function (_a) {
                var _b = __read(_a, 2), didOverlap = _b[0], overlapsNow = _b[1];
                return didOverlap && !overlapsNow;
            }))
                .subscribe(function () {
                dragOverActive = false;
                _this.zone.run(function () {
                    _this.dragLeave.next({
                        dropData: currentDragDropData
                    });
                });
            });
            drag.pipe(mergeMap(function () { return overlaps; })).subscribe({
                complete: function () {
                    if (dragOverActive) {
                        _this.zone.run(function () {
                            _this.drop.next({
                                dropData: currentDragDropData
                            });
                        });
                    }
                }
            });
        });
    };
    /**
     * @return {?}
     */
    DroppableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.currentDragSubscription.unsubscribe();
    };
    DroppableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlDroppable]'
                },] },
    ];
    /** @nocollapse */
    DroppableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DraggableHelper, },
        { type: NgZone, },
    ]; };
    DroppableDirective.propDecorators = {
        "dragEnter": [{ type: Output },],
        "dragLeave": [{ type: Output },],
        "dragOver": [{ type: Output },],
        "drop": [{ type: Output },],
    };
    return DroppableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragAndDropModule = /** @class */ (function () {
    function DragAndDropModule() {
    }
    /**
     * @return {?}
     */
    DragAndDropModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DragAndDropModule,
            providers: [DraggableHelper]
        };
    };
    DragAndDropModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DraggableDirective, DroppableDirective],
                    exports: [DraggableDirective, DroppableDirective]
                },] },
    ];
    return DragAndDropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DragAndDropModule, DraggableHelper, DraggableDirective as ɵa, DroppableDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS9kcm9wcGFibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZy1hbmQtZHJvcC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlSGVscGVyIHtcbiAgY3VycmVudERyYWc6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBOZ1pvbmUsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgbWFwLFxuICBtZXJnZU1hcCxcbiAgdGFrZVVudGlsLFxuICB0YWtlLFxuICB0YWtlTGFzdCxcbiAgcGFpcndpc2UsXG4gIHNoYXJlLFxuICBmaWx0ZXJcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBDb29yZGluYXRlcyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYWdBeGlzIHtcbiAgeDogYm9vbGVhbjtcbiAgeTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbmFwR3JpZCB7XG4gIHg/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRlRHJhZyA9IChjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnRlckV2ZW50IHtcbiAgY2xpZW50WDogbnVtYmVyO1xuICBjbGllbnRZOiBudW1iZXI7XG4gIGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudDtcbn1cblxuY29uc3QgTU9WRV9DVVJTT1I6IHN0cmluZyA9ICdtb3ZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bERyYWdnYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogYW4gb2JqZWN0IG9mIGRhdGEgeW91IGNhbiBwYXNzIHRvIHRoZSBkcm9wIGV2ZW50XG4gICAqL1xuICBASW5wdXQoKSBkcm9wRGF0YTogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgYXhpcyBhbG9uZyB3aGljaCB0aGUgZWxlbWVudCBpcyBkcmFnZ2FibGVcbiAgICovXG4gIEBJbnB1dCgpIGRyYWdBeGlzOiBEcmFnQXhpcyA9IHsgeDogdHJ1ZSwgeTogdHJ1ZSB9O1xuXG4gIC8qKlxuICAgKiBTbmFwIGFsbCBkcmFncyB0byBhbiB4IC8geSBncmlkXG4gICAqL1xuICBASW5wdXQoKSBkcmFnU25hcEdyaWQ6IFNuYXBHcmlkID0ge307XG5cbiAgLyoqXG4gICAqIFNob3cgYSBnaG9zdCBlbGVtZW50IHRoYXQgc2hvd3MgdGhlIGRyYWcgd2hlbiBkcmFnZ2luZ1xuICAgKi9cbiAgQElucHV0KCkgZ2hvc3REcmFnRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEFsbG93IGN1c3RvbSBiZWhhdmlvdXIgdG8gY29udHJvbCB3aGVuIHRoZSBlbGVtZW50IGlzIGRyYWdnZWRcbiAgICovXG4gIEBJbnB1dCgpIHZhbGlkYXRlRHJhZzogVmFsaWRhdGVEcmFnO1xuXG4gIC8qKlxuICAgKiBUaGUgY3Vyc29yIHRvIHVzZSB3aGVuIGRyYWdnaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSBkcmFnQ3Vyc29yID0gTU9WRV9DVVJTT1I7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGNhbiBiZSBkcmFnZ2VkIGFsb25nIG9uZSBheGlzIGFuZCBoYXMgdGhlIG1vdXNlIG9yIHBvaW50ZXIgZGV2aWNlIHByZXNzZWQgb24gaXRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnUG9pbnRlckRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgc3RhcnRlZCB0byBiZSBkcmFnZ2VkLlxuICAgKiBPbmx5IGNhbGxlZCBhZnRlciBhdCBsZWFzdCBvbmUgbW91c2Ugb3IgdG91Y2ggbW92ZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGJlaW5nIGRyYWdnZWRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciB0aGUgZWxlbWVudCBpcyBkcmFnZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q29vcmRpbmF0ZXM+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHBvaW50ZXJEb3duOiBTdWJqZWN0PFBvaW50ZXJFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwb2ludGVyTW92ZTogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcG9pbnRlclVwOiBTdWJqZWN0PFBvaW50ZXJFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnM6IHtcbiAgICBtb3VzZW1vdmU/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlZG93bj86ICgpID0+IHZvaWQ7XG4gICAgbW91c2V1cD86ICgpID0+IHZvaWQ7XG4gICAgbW91c2VlbnRlcj86ICgpID0+IHZvaWQ7XG4gICAgbW91c2VsZWF2ZT86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hzdGFydD86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2htb3ZlPzogKCkgPT4gdm9pZDtcbiAgICB0b3VjaGVuZD86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hjYW5jZWw/OiAoKSA9PiB2b2lkO1xuICB9ID0ge307XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRyYWdnYWJsZUhlbHBlcjogRHJhZ2dhYmxlSGVscGVyLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIGNvbnN0IHBvaW50ZXJEcmFnOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnBvaW50ZXJEb3duXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5jYW5EcmFnKCkpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChwb2ludGVyRG93bkV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50RHJhZzogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnUG9pbnRlckRvd24ubmV4dCh7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBwb2ludGVyTW92ZTogT2JzZXJ2YWJsZTxDb29yZGluYXRlcz4gPSB0aGlzLnBvaW50ZXJNb3ZlXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwb2ludGVyTW92ZUV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBwb2ludGVyTW92ZUV2ZW50LmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgY3VycmVudERyYWcsXG4gICAgICAgICAgICAgICAgICB4OiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFggLSBwb2ludGVyRG93bkV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICB5OiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFkgLSBwb2ludGVyRG93bkV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICBjbGllbnRYOiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICBjbGllbnRZOiBwb2ludGVyTW92ZUV2ZW50LmNsaWVudFlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgobW92ZURhdGE6IENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1NuYXBHcmlkLngpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnggPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKG1vdmVEYXRhLnggLyB0aGlzLmRyYWdTbmFwR3JpZC54KSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1NuYXBHcmlkLng7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1NuYXBHcmlkLnkpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnkgPVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKG1vdmVEYXRhLnkgLyB0aGlzLmRyYWdTbmFwR3JpZC55KSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1NuYXBHcmlkLnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVEYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgobW92ZURhdGE6IENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWdBeGlzLngpIHtcbiAgICAgICAgICAgICAgICAgIG1vdmVEYXRhLnggPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnQXhpcy55KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS55ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbW92ZURhdGE7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICh7IHgsIHkgfSkgPT4gIXRoaXMudmFsaWRhdGVEcmFnIHx8IHRoaXMudmFsaWRhdGVEcmFnKHsgeCwgeSB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwobWVyZ2UodGhpcy5wb2ludGVyVXAsIHRoaXMucG9pbnRlckRvd24pKSlcbiAgICAgICAgICAgIC5waXBlKHNoYXJlKCkpO1xuXG4gICAgICAgICAgcG9pbnRlck1vdmUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgcG9pbnRlckRvd25FdmVudC5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnQubmV4dCh7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3IodGhpcy5kcmFnQ3Vyc29yKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVIZWxwZXIuY3VycmVudERyYWcubmV4dChjdXJyZW50RHJhZyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwb2ludGVyTW92ZS5waXBlKHRha2VMYXN0KDEpKS5zdWJzY3JpYmUoKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnRW5kLm5leHQoeyB4LCB5IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50RHJhZy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRDc3NUcmFuc2Zvcm0oJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2hvc3REcmFnRW5hYmxlZCkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICdwb2ludGVyRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHBvaW50ZXJNb3ZlO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoc2hhcmUoKSk7XG5cbiAgICBtZXJnZShcbiAgICAgIHBvaW50ZXJEcmFnLnBpcGUodGFrZSgxKSkucGlwZShtYXAodmFsdWUgPT4gWywgdmFsdWVdKSksXG4gICAgICBwb2ludGVyRHJhZy5waXBlKHBhaXJ3aXNlKCkpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoW3ByZXZpb3VzLCBuZXh0XSkgPT4ge1xuICAgICAgICAgIGlmICghcHJldmlvdXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJldmlvdXMueCAhPT0gbmV4dC54IHx8IHByZXZpb3VzLnkgIT09IG5leHQueTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKG1hcCgoW3ByZXZpb3VzLCBuZXh0XSkgPT4gbmV4dCkpXG4gICAgICAuc3Vic2NyaWJlKCh7IHgsIHksIGN1cnJlbnREcmFnLCBjbGllbnRYLCBjbGllbnRZIH0pID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmFnZ2luZy5uZXh0KHsgeCwgeSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmdob3N0RHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAncG9pbnRlckV2ZW50cycsXG4gICAgICAgICAgICAnbm9uZSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0Q3NzVHJhbnNmb3JtKGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYCk7XG4gICAgICAgIGN1cnJlbnREcmFnLm5leHQoe1xuICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICBkcm9wRGF0YTogdGhpcy5kcm9wRGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydkcmFnQXhpcyddKSB7XG4gICAgICB0aGlzLmNoZWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnBvaW50ZXJEb3duLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5wb2ludGVyTW92ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMucG9pbnRlclVwLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgY29uc3QgY2FuRHJhZzogYm9vbGVhbiA9IHRoaXMuY2FuRHJhZygpO1xuICAgIGNvbnN0IGhhc0V2ZW50TGlzdGVuZXJzOiBib29sZWFuID1cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoY2FuRHJhZyAmJiAhaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vkb3duID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlZG93bicsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZXVwID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hzdGFydCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaFN0YXJ0KGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaGVuZCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgJ3RvdWNoZW5kJyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaEVuZChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hjYW5jZWwgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICd0b3VjaGNhbmNlbCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlZW50ZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAnbW91c2VlbnRlcicsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZWxlYXZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlbGVhdmUnLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZUxlYXZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY2FuRHJhZyAmJiBoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgdGhpcy51bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZW1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAobW91c2VNb3ZlRXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlLm5leHQoe1xuICAgICAgICAgICAgZXZlbnQ6IG1vdXNlTW92ZUV2ZW50LFxuICAgICAgICAgICAgY2xpZW50WDogbW91c2VNb3ZlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFk6IG1vdXNlTW92ZUV2ZW50LmNsaWVudFlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyRG93bi5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlO1xuICAgIH1cbiAgICB0aGlzLnBvaW50ZXJVcC5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNobW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgJ3RvdWNobW92ZScsXG4gICAgICAgICh0b3VjaE1vdmVFdmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucG9pbnRlck1vdmUubmV4dCh7XG4gICAgICAgICAgICBldmVudDogdG91Y2hNb3ZlRXZlbnQsXG4gICAgICAgICAgICBjbGllbnRYOiB0b3VjaE1vdmVFdmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZOiB0b3VjaE1vdmVFdmVudC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyRG93bi5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgY2xpZW50WTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlKCk7XG4gICAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmU7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlclVwLm5leHQoe1xuICAgICAgZXZlbnQsXG4gICAgICBjbGllbnRYOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgY2xpZW50WTogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDdXJzb3IodGhpcy5kcmFnQ3Vyc29yKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q3Vyc29yKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3NzVHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5naG9zdERyYWdFbmFibGVkKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1BdHRyaWJ1dGVzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nLFxuICAgICAgICAnLW1vei10cmFuc2Zvcm0nLFxuICAgICAgICAnLW8tdHJhbnNmb3JtJ1xuICAgICAgXTtcbiAgICAgIHRyYW5zZm9ybUF0dHJpYnV0ZXMuZm9yRWFjaCh0cmFuc2Zvcm1BdHRyaWJ1dGUgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIHRyYW5zZm9ybUF0dHJpYnV0ZSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5EcmFnKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdBeGlzLnggfHwgdGhpcy5kcmFnQXhpcy55O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXJzb3IodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucykuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICh0aGlzIGFzIGFueSkuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnNbdHlwZV0oKTtcbiAgICAgIGRlbGV0ZSAodGhpcyBhcyBhbnkpLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zW3R5cGVdO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgcGFpcndpc2UsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBtZXJnZU1hcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnZ2FibGVIZWxwZXIgfSBmcm9tICcuL2RyYWdnYWJsZS1oZWxwZXIucHJvdmlkZXInO1xuXG5mdW5jdGlvbiBpc0Nvb3JkaW5hdGVXaXRoaW5SZWN0YW5nbGUoXG4gIGNsaWVudFg6IG51bWJlcixcbiAgY2xpZW50WTogbnVtYmVyLFxuICByZWN0OiBDbGllbnRSZWN0XG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBjbGllbnRYID49IHJlY3QubGVmdCAmJlxuICAgIGNsaWVudFggPD0gcmVjdC5yaWdodCAmJlxuICAgIGNsaWVudFkgPj0gcmVjdC50b3AgJiZcbiAgICBjbGllbnRZIDw9IHJlY3QuYm90dG9tXG4gICk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcERhdGEge1xuICBkcm9wRGF0YTogYW55O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsRHJvcHBhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBzdGFydHMgb3ZlcmxhcHBpbmcgdGhlIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IHN0b3BzIG92ZXJsYXBwaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0xlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBpcyBtb3ZlZCBvdmVyIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ092ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IGlzIGRyb3BwZWQgb24gdGhpcyBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgY3VycmVudERyYWdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVIZWxwZXI6IERyYWdnYWJsZUhlbHBlcixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaW50ZXJmYWNlIEN1cnJlbnREcmFnRGF0YSB7XG4gICAgICBjbGllbnRYOiBudW1iZXI7XG4gICAgICBjbGllbnRZOiBudW1iZXI7XG4gICAgICBkcm9wRGF0YTogYW55O1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudERyYWdTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdnYWJsZUhlbHBlci5jdXJyZW50RHJhZy5zdWJzY3JpYmUoXG4gICAgICAoZHJhZzogU3ViamVjdDxDdXJyZW50RHJhZ0RhdGE+KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3BwYWJsZVJlY3RhbmdsZTogQ2xpZW50UmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BEYXRhOiBhbnk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXBzID0gZHJhZy5waXBlKFxuICAgICAgICAgIG1hcCgoeyBjbGllbnRYLCBjbGllbnRZLCBkcm9wRGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50RHJhZ0Ryb3BEYXRhID0gZHJvcERhdGE7XG4gICAgICAgICAgICByZXR1cm4gaXNDb29yZGluYXRlV2l0aGluUmVjdGFuZ2xlKFxuICAgICAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgICAgICBjbGllbnRZLFxuICAgICAgICAgICAgICBkcm9wcGFibGVSZWN0YW5nbGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBvdmVybGFwc0NoYW5nZWQgPSBvdmVybGFwcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgICAgIGxldCBkcmFnT3ZlckFjdGl2ZTogYm9vbGVhbjsgLy8gVE9ETyAtIHNlZSBpZiB0aGVyZSdzIGEgd2F5IG9mIGRvaW5nIHRoaXMgdmlhIHJ4anNcblxuICAgICAgICBvdmVybGFwc0NoYW5nZWRcbiAgICAgICAgICAucGlwZShmaWx0ZXIob3ZlcmxhcHNOb3cgPT4gb3ZlcmxhcHNOb3cpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgZHJhZ092ZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyLm5leHQoe1xuICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgb3ZlcmxhcHMucGlwZShmaWx0ZXIob3ZlcmxhcHNOb3cgPT4gb3ZlcmxhcHNOb3cpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlci5uZXh0KHtcbiAgICAgICAgICAgICAgZHJvcERhdGE6IGN1cnJlbnREcmFnRHJvcERhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGFwc0NoYW5nZWRcbiAgICAgICAgICAucGlwZShwYWlyd2lzZSgpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChbZGlkT3ZlcmxhcCwgb3ZlcmxhcHNOb3ddKSA9PiBkaWRPdmVybGFwICYmICFvdmVybGFwc05vdylcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBkcmFnT3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlLm5leHQoe1xuICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgZHJhZy5waXBlKG1lcmdlTWFwKCgpID0+IG92ZXJsYXBzKSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRyYWdPdmVyQWN0aXZlKSB7XG4gICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcC5uZXh0KHtcbiAgICAgICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudERyYWdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0RyYWdnYWJsZUhlbHBlcl1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFFQTs7MkJBQzhCLElBQUksT0FBTyxFQUFFOzswQkFIM0M7SUFJQzs7Ozs7O0FDNkNELHFCQUFNLFdBQVcsR0FBVyxNQUFNLENBQUM7Ozs7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