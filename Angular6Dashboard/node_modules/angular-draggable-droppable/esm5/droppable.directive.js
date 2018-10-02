/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { distinctUntilChanged, pairwise, filter, map, mergeMap } from 'rxjs/operators';
import { DraggableHelper } from './draggable-helper.provider';
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
/**
 * @record
 */
export function DropData() { }
function DropData_tsickle_Closure_declarations() {
    /** @type {?} */
    DropData.prototype.dropData;
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
        /**
         * @record
         */
        function CurrentDragData() { }
        function CurrentDragData_tsickle_Closure_declarations() {
            /** @type {?} */
            CurrentDragData.prototype.clientX;
            /** @type {?} */
            CurrentDragData.prototype.clientY;
            /** @type {?} */
            CurrentDragData.prototype.dropData;
        }
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
                var _b = tslib_1.__read(_a, 2), didOverlap = _b[0], overlapsNow = _b[1];
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
export { DroppableDirective };
function DroppableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DroppableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DroppableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DroppableDirective.propDecorators;
    /**
     * Called when a draggable element starts overlapping the element
     * @type {?}
     */
    DroppableDirective.prototype.dragEnter;
    /**
     * Called when a draggable element stops overlapping the element
     * @type {?}
     */
    DroppableDirective.prototype.dragLeave;
    /**
     * Called when a draggable element is moved over the element
     * @type {?}
     */
    DroppableDirective.prototype.dragOver;
    /**
     * Called when a draggable element is dropped on this element
     * @type {?}
     */
    DroppableDirective.prototype.drop;
    /** @type {?} */
    DroppableDirective.prototype.currentDragSubscription;
    /** @type {?} */
    DroppableDirective.prototype.element;
    /** @type {?} */
    DroppableDirective.prototype.draggableHelper;
    /** @type {?} */
    DroppableDirective.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcHBhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS8iLCJzb3VyY2VzIjpbImRyb3BwYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFFVixNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLFFBQVEsRUFDUixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDVCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7OztBQUU5RCxxQ0FDRSxPQUFlLEVBQ2YsT0FBZSxFQUNmLElBQWdCO0lBRWhCLE1BQU0sQ0FBQyxDQUNMLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNwQixPQUFPLElBQUksSUFBSSxDQUFDLEtBQUs7UUFDckIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHO1FBQ25CLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUN2QixDQUFDO0NBQ0g7Ozs7Ozs7Ozs7SUFnQ0MsNEJBQ1UsU0FDQSxpQkFDQTtRQUZBLFlBQU8sR0FBUCxPQUFPO1FBQ1Asb0JBQWUsR0FBZixlQUFlO1FBQ2YsU0FBSSxHQUFKLElBQUk7Ozs7eUJBdEJRLElBQUksWUFBWSxFQUFZOzs7O3lCQUs1QixJQUFJLFlBQVksRUFBWTs7Ozt3QkFLN0IsSUFBSSxZQUFZLEVBQVk7Ozs7b0JBS2hDLElBQUksWUFBWSxFQUFZO0tBUXpDOzs7O0lBRUoscUNBQVE7OztJQUFSO1FBQUEsaUJBeUVDOzs7Ozs7Ozs7Ozs7O1FBbEVDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQ3ZFLFVBQUMsSUFBOEI7WUFDN0IscUJB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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIHBhaXJ3aXNlLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgbWVyZ2VNYXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlSGVscGVyIH0gZnJvbSAnLi9kcmFnZ2FibGUtaGVscGVyLnByb3ZpZGVyJztcblxuZnVuY3Rpb24gaXNDb29yZGluYXRlV2l0aGluUmVjdGFuZ2xlKFxuICBjbGllbnRYOiBudW1iZXIsXG4gIGNsaWVudFk6IG51bWJlcixcbiAgcmVjdDogQ2xpZW50UmVjdFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgY2xpZW50WCA+PSByZWN0LmxlZnQgJiZcbiAgICBjbGllbnRYIDw9IHJlY3QucmlnaHQgJiZcbiAgICBjbGllbnRZID49IHJlY3QudG9wICYmXG4gICAgY2xpZW50WSA8PSByZWN0LmJvdHRvbVxuICApO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BEYXRhIHtcbiAgZHJvcERhdGE6IGFueTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bERyb3BwYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgc3RhcnRzIG92ZXJsYXBwaW5nIHRoZSBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBzdG9wcyBvdmVybGFwcGluZyB0aGUgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgaXMgbW92ZWQgb3ZlciB0aGUgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBkcmFnZ2FibGUgZWxlbWVudCBpcyBkcm9wcGVkIG9uIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIGN1cnJlbnREcmFnU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZHJhZ2dhYmxlSGVscGVyOiBEcmFnZ2FibGVIZWxwZXIsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGludGVyZmFjZSBDdXJyZW50RHJhZ0RhdGEge1xuICAgICAgY2xpZW50WDogbnVtYmVyO1xuICAgICAgY2xpZW50WTogbnVtYmVyO1xuICAgICAgZHJvcERhdGE6IGFueTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnREcmFnU3Vic2NyaXB0aW9uID0gdGhpcy5kcmFnZ2FibGVIZWxwZXIuY3VycmVudERyYWcuc3Vic2NyaWJlKFxuICAgICAgKGRyYWc6IFN1YmplY3Q8Q3VycmVudERyYWdEYXRhPikgPT4ge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVSZWN0YW5nbGU6IENsaWVudFJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgY3VycmVudERyYWdEcm9wRGF0YTogYW55O1xuICAgICAgICBjb25zdCBvdmVybGFwcyA9IGRyYWcucGlwZShcbiAgICAgICAgICBtYXAoKHsgY2xpZW50WCwgY2xpZW50WSwgZHJvcERhdGEgfSkgPT4ge1xuICAgICAgICAgICAgY3VycmVudERyYWdEcm9wRGF0YSA9IGRyb3BEYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGlzQ29vcmRpbmF0ZVdpdGhpblJlY3RhbmdsZShcbiAgICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICAgICAgZHJvcHBhYmxlUmVjdGFuZ2xlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxhcHNDaGFuZ2VkID0gb3ZlcmxhcHMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgICAgICBsZXQgZHJhZ092ZXJBY3RpdmU6IGJvb2xlYW47IC8vIFRPRE8gLSBzZWUgaWYgdGhlcmUncyBhIHdheSBvZiBkb2luZyB0aGlzIHZpYSByeGpzXG5cbiAgICAgICAgb3ZlcmxhcHNDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKG92ZXJsYXBzTm93ID0+IG92ZXJsYXBzTm93KSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGRyYWdPdmVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRyYWdFbnRlci5uZXh0KHtcbiAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIG92ZXJsYXBzLnBpcGUoZmlsdGVyKG92ZXJsYXBzTm93ID0+IG92ZXJsYXBzTm93KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXIubmV4dCh7XG4gICAgICAgICAgICAgIGRyb3BEYXRhOiBjdXJyZW50RHJhZ0Ryb3BEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3ZlcmxhcHNDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUocGFpcndpc2UoKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoW2RpZE92ZXJsYXAsIG92ZXJsYXBzTm93XSkgPT4gZGlkT3ZlcmxhcCAmJiAhb3ZlcmxhcHNOb3cpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgZHJhZ092ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZS5uZXh0KHtcbiAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRyYWcucGlwZShtZXJnZU1hcCgoKSA9PiBvdmVybGFwcykpLnN1YnNjcmliZSh7XG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChkcmFnT3ZlckFjdGl2ZSkge1xuICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3AubmV4dCh7XG4gICAgICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnREcmFnU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==