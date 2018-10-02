(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('angular-draggable-droppable', ['exports', 'rxjs', '@angular/core', 'rxjs/operators'], factory) :
    (factory((global['angular-draggable-droppable'] = {}),global.rxjs,global.ng.core,global.rxjs.operators));
}(this, (function (exports,rxjs,core,operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DraggableHelper = (function () {
        function DraggableHelper() {
            this.currentDrag = new rxjs.Subject();
        }
        return DraggableHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ MOVE_CURSOR = 'move';
    var DraggableDirective = (function () {
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
            this.dragPointerDown = new core.EventEmitter();
            /**
             * Called when the element has started to be dragged.
             * Only called after at least one mouse or touch move event
             */
            this.dragStart = new core.EventEmitter();
            /**
             * Called when the element is being dragged
             */
            this.dragging = new core.EventEmitter();
            /**
             * Called after the element is dragged
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * @hidden
             */
            this.pointerDown = new rxjs.Subject();
            /**
             * @hidden
             */
            this.pointerMove = new rxjs.Subject();
            /**
             * @hidden
             */
            this.pointerUp = new rxjs.Subject();
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
                    .pipe(operators.filter(function () { return _this.canDrag(); }))
                    .pipe(operators.mergeMap(function (pointerDownEvent) {
                    var /** @type {?} */ currentDrag = new rxjs.Subject();
                    _this.zone.run(function () {
                        _this.dragPointerDown.next({ x: 0, y: 0 });
                    });
                    var /** @type {?} */ pointerMove = _this.pointerMove
                        .pipe(operators.map(function (pointerMoveEvent) {
                        pointerMoveEvent.event.preventDefault();
                        return {
                            currentDrag: currentDrag,
                            x: pointerMoveEvent.clientX - pointerDownEvent.clientX,
                            y: pointerMoveEvent.clientY - pointerDownEvent.clientY,
                            clientX: pointerMoveEvent.clientX,
                            clientY: pointerMoveEvent.clientY
                        };
                    }))
                        .pipe(operators.map(function (moveData) {
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
                        .pipe(operators.map(function (moveData) {
                        if (!_this.dragAxis.x) {
                            moveData.x = 0;
                        }
                        if (!_this.dragAxis.y) {
                            moveData.y = 0;
                        }
                        return moveData;
                    }))
                        .pipe(operators.filter(function (_a) {
                        var x = _a.x, y = _a.y;
                        return !_this.validateDrag || _this.validateDrag({ x: x, y: y });
                    }))
                        .pipe(operators.takeUntil(rxjs.merge(_this.pointerUp, _this.pointerDown)))
                        .pipe(operators.share());
                    pointerMove.pipe(operators.take(1)).subscribe(function () {
                        pointerDownEvent.event.preventDefault();
                        _this.zone.run(function () {
                            _this.dragStart.next({ x: 0, y: 0 });
                        });
                        _this.setCursor(_this.dragCursor);
                        _this.draggableHelper.currentDrag.next(currentDrag);
                    });
                    pointerMove.pipe(operators.takeLast(1)).subscribe(function (_a) {
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
                    .pipe(operators.share());
                rxjs.merge(pointerDrag.pipe(operators.take(1)).pipe(operators.map(function (value) { return [, value]; })), pointerDrag.pipe(operators.pairwise()))
                    .pipe(operators.filter(function (_a) {
                    var _b = __read(_a, 2), previous = _b[0], next = _b[1];
                    if (!previous) {
                        return true;
                    }
                    return previous.x !== next.x || previous.y !== next.y;
                }))
                    .pipe(operators.map(function (_a) {
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
                    ((_this)).eventListenerSubscriptions[type]();
                    delete ((_this)).eventListenerSubscriptions[type];
                });
            };
        DraggableDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlDraggable]'
                    },] },
        ];
        /** @nocollapse */
        DraggableDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: core.Renderer2, },
                { type: DraggableHelper, },
                { type: core.NgZone, },
            ];
        };
        DraggableDirective.propDecorators = {
            "dropData": [{ type: core.Input },],
            "dragAxis": [{ type: core.Input },],
            "dragSnapGrid": [{ type: core.Input },],
            "ghostDragEnabled": [{ type: core.Input },],
            "validateDrag": [{ type: core.Input },],
            "dragCursor": [{ type: core.Input },],
            "dragPointerDown": [{ type: core.Output },],
            "dragStart": [{ type: core.Output },],
            "dragging": [{ type: core.Output },],
            "dragEnd": [{ type: core.Output },],
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
    var DroppableDirective = (function () {
        function DroppableDirective(element, draggableHelper, zone) {
            this.element = element;
            this.draggableHelper = draggableHelper;
            this.zone = zone;
            /**
             * Called when a draggable element starts overlapping the element
             */
            this.dragEnter = new core.EventEmitter();
            /**
             * Called when a draggable element stops overlapping the element
             */
            this.dragLeave = new core.EventEmitter();
            /**
             * Called when a draggable element is moved over the element
             */
            this.dragOver = new core.EventEmitter();
            /**
             * Called when a draggable element is dropped on this element
             */
            this.drop = new core.EventEmitter();
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
                    var /** @type {?} */ overlaps = drag.pipe(operators.map(function (_a) {
                        var clientX = _a.clientX, clientY = _a.clientY, dropData = _a.dropData;
                        currentDragDropData = dropData;
                        return isCoordinateWithinRectangle(clientX, clientY, droppableRectangle);
                    }));
                    var /** @type {?} */ overlapsChanged = overlaps.pipe(operators.distinctUntilChanged());
                    var /** @type {?} */ dragOverActive; // TODO - see if there's a way of doing this via rxjs
                    overlapsChanged
                        .pipe(operators.filter(function (overlapsNow) { return overlapsNow; }))
                        .subscribe(function () {
                        dragOverActive = true;
                        _this.zone.run(function () {
                            _this.dragEnter.next({
                                dropData: currentDragDropData
                            });
                        });
                    });
                    overlaps.pipe(operators.filter(function (overlapsNow) { return overlapsNow; })).subscribe(function () {
                        _this.zone.run(function () {
                            _this.dragOver.next({
                                dropData: currentDragDropData
                            });
                        });
                    });
                    overlapsChanged
                        .pipe(operators.pairwise())
                        .pipe(operators.filter(function (_a) {
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
                    drag.pipe(operators.mergeMap(function () { return overlaps; })).subscribe({
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
            { type: core.Directive, args: [{
                        selector: '[mwlDroppable]'
                    },] },
        ];
        /** @nocollapse */
        DroppableDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: DraggableHelper, },
                { type: core.NgZone, },
            ];
        };
        DroppableDirective.propDecorators = {
            "dragEnter": [{ type: core.Output },],
            "dragLeave": [{ type: core.Output },],
            "dragOver": [{ type: core.Output },],
            "drop": [{ type: core.Output },],
        };
        return DroppableDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DragAndDropModule = (function () {
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
            { type: core.NgModule, args: [{
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

    exports.DragAndDropModule = DragAndDropModule;
    exports.DraggableHelper = DraggableHelper;
    exports.ɵa = DraggableDirective;
    exports.ɵb = DroppableDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS9kcm9wcGFibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvZHJhZy1hbmQtZHJvcC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZUhlbHBlciB7XG4gIGN1cnJlbnREcmFnOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uQ2hhbmdlcyxcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG4gIHRha2VVbnRpbCxcbiAgdGFrZSxcbiAgdGFrZUxhc3QsXG4gIHBhaXJ3aXNlLFxuICBzaGFyZSxcbiAgZmlsdGVyXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJy4vZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29vcmRpbmF0ZXMge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcmFnQXhpcyB7XG4gIHg6IGJvb2xlYW47XG4gIHk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU25hcEdyaWQge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0ZURyYWcgPSAoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKSA9PiBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50ZXJFdmVudCB7XG4gIGNsaWVudFg6IG51bWJlcjtcbiAgY2xpZW50WTogbnVtYmVyO1xuICBldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQ7XG59XG5cbmNvbnN0IE1PVkVfQ1VSU09SOiBzdHJpbmcgPSAnbW92ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xEcmFnZ2FibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIGFuIG9iamVjdCBvZiBkYXRhIHlvdSBjYW4gcGFzcyB0byB0aGUgZHJvcCBldmVudFxuICAgKi9cbiAgQElucHV0KCkgZHJvcERhdGE6IGFueTtcblxuICAvKipcbiAgICogVGhlIGF4aXMgYWxvbmcgd2hpY2ggdGhlIGVsZW1lbnQgaXMgZHJhZ2dhYmxlXG4gICAqL1xuICBASW5wdXQoKSBkcmFnQXhpczogRHJhZ0F4aXMgPSB7IHg6IHRydWUsIHk6IHRydWUgfTtcblxuICAvKipcbiAgICogU25hcCBhbGwgZHJhZ3MgdG8gYW4geCAvIHkgZ3JpZFxuICAgKi9cbiAgQElucHV0KCkgZHJhZ1NuYXBHcmlkOiBTbmFwR3JpZCA9IHt9O1xuXG4gIC8qKlxuICAgKiBTaG93IGEgZ2hvc3QgZWxlbWVudCB0aGF0IHNob3dzIHRoZSBkcmFnIHdoZW4gZHJhZ2dpbmdcbiAgICovXG4gIEBJbnB1dCgpIGdob3N0RHJhZ0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBbGxvdyBjdXN0b20gYmVoYXZpb3VyIHRvIGNvbnRyb2wgd2hlbiB0aGUgZWxlbWVudCBpcyBkcmFnZ2VkXG4gICAqL1xuICBASW5wdXQoKSB2YWxpZGF0ZURyYWc6IFZhbGlkYXRlRHJhZztcblxuICAvKipcbiAgICogVGhlIGN1cnNvciB0byB1c2Ugd2hlbiBkcmFnZ2luZyB0aGUgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgZHJhZ0N1cnNvciA9IE1PVkVfQ1VSU09SO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBjYW4gYmUgZHJhZ2dlZCBhbG9uZyBvbmUgYXhpcyBhbmQgaGFzIHRoZSBtb3VzZSBvciBwb2ludGVyIGRldmljZSBwcmVzc2VkIG9uIGl0XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ1BvaW50ZXJEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxDb29yZGluYXRlcz4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIHN0YXJ0ZWQgdG8gYmUgZHJhZ2dlZC5cbiAgICogT25seSBjYWxsZWQgYWZ0ZXIgYXQgbGVhc3Qgb25lIG1vdXNlIG9yIHRvdWNoIG1vdmUgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBiZWluZyBkcmFnZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGVsZW1lbnQgaXMgZHJhZ2dlZFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPENvb3JkaW5hdGVzPigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwb2ludGVyRG93bjogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcG9pbnRlck1vdmU6IFN1YmplY3Q8UG9pbnRlckV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHBvaW50ZXJVcDogU3ViamVjdDxQb2ludGVyRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zOiB7XG4gICAgbW91c2Vtb3ZlPzogKCkgPT4gdm9pZDtcbiAgICBtb3VzZWRvd24/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNldXA/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlZW50ZXI/OiAoKSA9PiB2b2lkO1xuICAgIG1vdXNlbGVhdmU/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNoc3RhcnQ/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNobW92ZT86ICgpID0+IHZvaWQ7XG4gICAgdG91Y2hlbmQ/OiAoKSA9PiB2b2lkO1xuICAgIHRvdWNoY2FuY2VsPzogKCkgPT4gdm9pZDtcbiAgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVIZWxwZXI6IERyYWdnYWJsZUhlbHBlcixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBjb25zdCBwb2ludGVyRHJhZzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5wb2ludGVyRG93blxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuY2FuRHJhZygpKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgocG9pbnRlckRvd25FdmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudERyYWc6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1BvaW50ZXJEb3duLm5leHQoeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgcG9pbnRlck1vdmU6IE9ic2VydmFibGU8Q29vcmRpbmF0ZXM+ID0gdGhpcy5wb2ludGVyTW92ZVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocG9pbnRlck1vdmVFdmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcG9pbnRlck1vdmVFdmVudC5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnREcmFnLFxuICAgICAgICAgICAgICAgICAgeDogcG9pbnRlck1vdmVFdmVudC5jbGllbnRYIC0gcG9pbnRlckRvd25FdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgeTogcG9pbnRlck1vdmVFdmVudC5jbGllbnRZIC0gcG9pbnRlckRvd25FdmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WDogcG9pbnRlck1vdmVFdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgY2xpZW50WTogcG9pbnRlck1vdmVFdmVudC5jbGllbnRZXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKG1vdmVEYXRhOiBDb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTbmFwR3JpZC54KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS54ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihtb3ZlRGF0YS54IC8gdGhpcy5kcmFnU25hcEdyaWQueCkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdTbmFwR3JpZC54O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTbmFwR3JpZC55KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS55ID1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihtb3ZlRGF0YS55IC8gdGhpcy5kcmFnU25hcEdyaWQueSkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdTbmFwR3JpZC55O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlRGF0YTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKG1vdmVEYXRhOiBDb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnQXhpcy54KSB7XG4gICAgICAgICAgICAgICAgICBtb3ZlRGF0YS54ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ0F4aXMueSkge1xuICAgICAgICAgICAgICAgICAgbW92ZURhdGEueSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVEYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAoeyB4LCB5IH0pID0+ICF0aGlzLnZhbGlkYXRlRHJhZyB8fCB0aGlzLnZhbGlkYXRlRHJhZyh7IHgsIHkgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1lcmdlKHRoaXMucG9pbnRlclVwLCB0aGlzLnBvaW50ZXJEb3duKSkpXG4gICAgICAgICAgICAucGlwZShzaGFyZSgpKTtcblxuICAgICAgICAgIHBvaW50ZXJNb3ZlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHBvaW50ZXJEb3duRXZlbnQuZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0Lm5leHQoeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29yKHRoaXMuZHJhZ0N1cnNvcik7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlSGVscGVyLmN1cnJlbnREcmFnLm5leHQoY3VycmVudERyYWcpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcG9pbnRlck1vdmUucGlwZSh0YWtlTGFzdCgxKSkuc3Vic2NyaWJlKCh7IHgsIHkgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ0VuZC5uZXh0KHsgeCwgeSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3VycmVudERyYWcuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3NzVHJhbnNmb3JtKCcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmdob3N0RHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAncG9pbnRlckV2ZW50cycsXG4gICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBwb2ludGVyTW92ZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKHNoYXJlKCkpO1xuXG4gICAgbWVyZ2UoXG4gICAgICBwb2ludGVyRHJhZy5waXBlKHRha2UoMSkpLnBpcGUobWFwKHZhbHVlID0+IFssIHZhbHVlXSkpLFxuICAgICAgcG9pbnRlckRyYWcucGlwZShwYWlyd2lzZSgpKVxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKFtwcmV2aW91cywgbmV4dF0pID0+IHtcbiAgICAgICAgICBpZiAoIXByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzLnggIT09IG5leHQueCB8fCBwcmV2aW91cy55ICE9PSBuZXh0Lnk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShtYXAoKFtwcmV2aW91cywgbmV4dF0pID0+IG5leHQpKVxuICAgICAgLnN1YnNjcmliZSgoeyB4LCB5LCBjdXJyZW50RHJhZywgY2xpZW50WCwgY2xpZW50WSB9KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhZ2dpbmcubmV4dCh7IHgsIHkgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5naG9zdERyYWdFbmFibGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3BvaW50ZXJFdmVudHMnLFxuICAgICAgICAgICAgJ25vbmUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldENzc1RyYW5zZm9ybShgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWApO1xuICAgICAgICBjdXJyZW50RHJhZy5uZXh0KHtcbiAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgZHJvcERhdGE6IHRoaXMuZHJvcERhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snZHJhZ0F4aXMnXSkge1xuICAgICAgdGhpcy5jaGVja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5wb2ludGVyRG93bi5jb21wbGV0ZSgpO1xuICAgIHRoaXMucG9pbnRlck1vdmUuY29tcGxldGUoKTtcbiAgICB0aGlzLnBvaW50ZXJVcC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0V2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbkRyYWc6IGJvb2xlYW4gPSB0aGlzLmNhbkRyYWcoKTtcbiAgICBjb25zdCBoYXNFdmVudExpc3RlbmVyczogYm9vbGVhbiA9XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zKS5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGNhbkRyYWcgJiYgIWhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlZG93biA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bihldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2V1cCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgJ21vdXNldXAnLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNoc3RhcnQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hTdGFydChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2hlbmQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICd0b3VjaGVuZCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNoY2FuY2VsID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAndG91Y2hjYW5jZWwnLFxuICAgICAgICAgIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoRW5kKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZWVudGVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZUVudGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2VsZWF2ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtb3VzZWxlYXZlJyxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VMZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIWNhbkRyYWcgJiYgaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMubW91c2Vtb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgKG1vdXNlTW92ZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5wb2ludGVyTW92ZS5uZXh0KHtcbiAgICAgICAgICAgIGV2ZW50OiBtb3VzZU1vdmVFdmVudCxcbiAgICAgICAgICAgIGNsaWVudFg6IG1vdXNlTW92ZUV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZOiBtb3VzZU1vdmVFdmVudC5jbGllbnRZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlckRvd24ubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VVcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy5tb3VzZW1vdmUoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLm1vdXNlbW92ZTtcbiAgICB9XG4gICAgdGhpcy5wb2ludGVyVXAubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9ucy50b3VjaG1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgICAodG91Y2hNb3ZlRXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlLm5leHQoe1xuICAgICAgICAgICAgZXZlbnQ6IHRvdWNoTW92ZUV2ZW50LFxuICAgICAgICAgICAgY2xpZW50WDogdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgY2xpZW50WTogdG91Y2hNb3ZlRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMucG9pbnRlckRvd24ubmV4dCh7XG4gICAgICBldmVudCxcbiAgICAgIGNsaWVudFg6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zLnRvdWNobW92ZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMudG91Y2htb3ZlO1xuICAgIH1cbiAgICB0aGlzLnBvaW50ZXJVcC5uZXh0KHtcbiAgICAgIGV2ZW50LFxuICAgICAgY2xpZW50WDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q3Vyc29yKHRoaXMuZHJhZ0N1cnNvcik7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEN1cnNvcignJyk7XG4gIH1cblxuICBwcml2YXRlIHNldENzc1RyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ2hvc3REcmFnRW5hYmxlZCkge1xuICAgICAgY29uc3QgdHJhbnNmb3JtQXR0cmlidXRlcyA9IFtcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICctd2Via2l0LXRyYW5zZm9ybScsXG4gICAgICAgICctbXMtdHJhbnNmb3JtJyxcbiAgICAgICAgJy1tb3otdHJhbnNmb3JtJyxcbiAgICAgICAgJy1vLXRyYW5zZm9ybSdcbiAgICAgIF07XG4gICAgICB0cmFuc2Zvcm1BdHRyaWJ1dGVzLmZvckVhY2godHJhbnNmb3JtQXR0cmlidXRlID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICB0cmFuc2Zvcm1BdHRyaWJ1dGUsXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FuRHJhZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnQXhpcy54IHx8IHRoaXMuZHJhZ0F4aXMueTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3Vyc29yKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZXZlbnRMaXN0ZW5lclN1YnNjcmlwdGlvbnMpLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAodGhpcyBhcyBhbnkpLmV2ZW50TGlzdGVuZXJTdWJzY3JpcHRpb25zW3R5cGVdKCk7XG4gICAgICBkZWxldGUgKHRoaXMgYXMgYW55KS5ldmVudExpc3RlbmVyU3Vic2NyaXB0aW9uc1t0eXBlXTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIHBhaXJ3aXNlLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgbWVyZ2VNYXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuZnVuY3Rpb24gaXNDb29yZGluYXRlV2l0aGluUmVjdGFuZ2xlKFxuICBjbGllbnRYOiBudW1iZXIsXG4gIGNsaWVudFk6IG51bWJlcixcbiAgcmVjdDogQ2xpZW50UmVjdFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgY2xpZW50WCA+PSByZWN0LmxlZnQgJiZcbiAgICBjbGllbnRYIDw9IHJlY3QucmlnaHQgJiZcbiAgICBjbGllbnRZID49IHJlY3QudG9wICYmXG4gICAgY2xpZW50WSA8PSByZWN0LmJvdHRvbVxuICApO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BEYXRhIHtcbiAgZHJvcERhdGE6IGFueTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bERyb3BwYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgc3RhcnRzIG92ZXJsYXBwaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBzdG9wcyBvdmVybGFwcGluZyB0aGUgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgaXMgbW92ZWQgb3ZlciB0aGUgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBpcyBkcm9wcGVkIG9uIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIGN1cnJlbnREcmFnU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZHJhZ2dhYmxlSGVscGVyOiBEcmFnZ2FibGVIZWxwZXIsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGludGVyZmFjZSBDdXJyZW50RHJhZ0RhdGEge1xuICAgICAgY2xpZW50WDogbnVtYmVyO1xuICAgICAgY2xpZW50WTogbnVtYmVyO1xuICAgICAgZHJvcERhdGE6IGFueTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnREcmFnU3Vic2NyaXB0aW9uID0gdGhpcy5kcmFnZ2FibGVIZWxwZXIuY3VycmVudERyYWcuc3Vic2NyaWJlKFxuICAgICAgKGRyYWc6IFN1YmplY3Q8Q3VycmVudERyYWdEYXRhPikgPT4ge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVSZWN0YW5nbGU6IENsaWVudFJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgY3VycmVudERyYWdEcm9wRGF0YTogYW55O1xuICAgICAgICBjb25zdCBvdmVybGFwcyA9IGRyYWcucGlwZShcbiAgICAgICAgICBtYXAoKHsgY2xpZW50WCwgY2xpZW50WSwgZHJvcERhdGEgfSkgPT4ge1xuICAgICAgICAgICAgY3VycmVudERyYWdEcm9wRGF0YSA9IGRyb3BEYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGlzQ29vcmRpbmF0ZVdpdGhpblJlY3RhbmdsZShcbiAgICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICAgICAgZHJvcHBhYmxlUmVjdGFuZ2xlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxhcHNDaGFuZ2VkID0gb3ZlcmxhcHMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgICAgICBsZXQgZHJhZ092ZXJBY3RpdmU6IGJvb2xlYW47IC8vIFRPRE8gLSBzZWUgaWYgdGhlcmUncyBhIHdheSBvZiBkb2luZyB0aGlzIHZpYSByeGpzXG5cbiAgICAgICAgb3ZlcmxhcHNDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKG92ZXJsYXBzTm93ID0+IG92ZXJsYXBzTm93KSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGRyYWdPdmVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRyYWdFbnRlci5uZXh0KHtcbiAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG92ZXJsYXBzLnBpcGUoZmlsdGVyKG92ZXJsYXBzTm93ID0+IG92ZXJsYXBzTm93KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXIubmV4dCh7XG4gICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3ZlcmxhcHNDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUocGFpcndpc2UoKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoW2RpZE92ZXJsYXAsIG92ZXJsYXBzTm93XSkgPT4gZGlkT3ZlcmxhcCAmJiAhb3ZlcmxhcHNOb3cpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgZHJhZ092ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZS5uZXh0KHtcbiAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRyYWcucGlwZShtZXJnZU1hcCgoKSA9PiBvdmVybGFwcykpLnN1YnNjcmliZSh7XG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChkcmFnT3ZlckFjdGl2ZSkge1xuICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3AubmV4dCh7XG4gICAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnREcmFnU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wcGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJy4vZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtEcmFnZ2FibGVIZWxwZXJdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJFdmVudEVtaXR0ZXIiLCJmaWx0ZXIiLCJtZXJnZU1hcCIsIm1hcCIsInRha2VVbnRpbCIsIm1lcmdlIiwic2hhcmUiLCJ0YWtlIiwidGFrZUxhc3QiLCJwYWlyd2lzZSIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJOZ1pvbmUiLCJJbnB1dCIsIk91dHB1dCIsImRpc3RpbmN0VW50aWxDaGFuZ2VkIiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLG9CQWlHdUIsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFD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