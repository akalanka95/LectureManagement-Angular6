/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class DroppableDirective {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcHBhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZS8iLCJzb3VyY2VzIjpbImRyb3BwYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUVWLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsUUFBUSxFQUNSLE1BQU0sRUFDTixHQUFHLEVBQ0gsUUFBUSxFQUNULE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0FBRTlELHFDQUNFLE9BQWUsRUFDZixPQUFlLEVBQ2YsSUFBZ0I7SUFFaEIsTUFBTSxDQUFDLENBQ0wsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJO1FBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSztRQUNyQixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUc7UUFDbkIsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQ3ZCLENBQUM7Q0FDSDs7Ozs7Ozs7O0FBU0QsTUFBTTs7Ozs7O0lBdUJKLFlBQ1UsU0FDQSxpQkFDQTtRQUZBLFlBQU8sR0FBUCxPQUFPO1FBQ1Asb0JBQWUsR0FBZixlQUFlO1FBQ2YsU0FBSSxHQUFKLElBQUk7Ozs7eUJBdEJRLElBQUksWUFBWSxFQUFZOzs7O3lCQUs1QixJQUFJLFlBQVksRUFBWTs7Ozt3QkFLN0IsSUFBSSxZQUFZLEVBQVk7Ozs7b0JBS2hDLElBQUksWUFBWSxFQUFZO0tBUXpDOzs7O0lBRUosUUFBUTs7Ozs7Ozs7Ozs7OztRQU9OLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQ3ZFLENBQUMsSUFBOEIsRUFBRSxFQUFFO1lBQ2pDLHVC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TSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgT25Jbml0LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBwYWlyd2lzZSxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIG1lcmdlTWFwXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJy4vZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlcic7XG5cbmZ1bmN0aW9uIGlzQ29vcmRpbmF0ZVdpdGhpblJlY3RhbmdsZShcbiAgY2xpZW50WDogbnVtYmVyLFxuICBjbGllbnRZOiBudW1iZXIsXG4gIHJlY3Q6IENsaWVudFJlY3Rcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIGNsaWVudFggPj0gcmVjdC5sZWZ0ICYmXG4gICAgY2xpZW50WCA8PSByZWN0LnJpZ2h0ICYmXG4gICAgY2xpZW50WSA+PSByZWN0LnRvcCAmJlxuICAgIGNsaWVudFkgPD0gcmVjdC5ib3R0b21cbiAgKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcm9wRGF0YSB7XG4gIGRyb3BEYXRhOiBhbnk7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xEcm9wcGFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcm9wcGFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IHN0YXJ0cyBvdmVybGFwcGluZyB0aGUgZWxlbWVudFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgc3RvcHMgb3ZlcmxhcHBpbmcgdGhlIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPERyb3BEYXRhPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGRyYWdnYWJsZSBlbGVtZW50IGlzIG1vdmVkIG92ZXIgdGhlIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZHJhZ2dhYmxlIGVsZW1lbnQgaXMgZHJvcHBlZCBvbiB0aGlzIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkcm9wID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wRGF0YT4oKTtcblxuICBjdXJyZW50RHJhZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRyYWdnYWJsZUhlbHBlcjogRHJhZ2dhYmxlSGVscGVyLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpbnRlcmZhY2UgQ3VycmVudERyYWdEYXRhIHtcbiAgICAgIGNsaWVudFg6IG51bWJlcjtcbiAgICAgIGNsaWVudFk6IG51bWJlcjtcbiAgICAgIGRyb3BEYXRhOiBhbnk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50RHJhZ1N1YnNjcmlwdGlvbiA9IHRoaXMuZHJhZ2dhYmxlSGVscGVyLmN1cnJlbnREcmFnLnN1YnNjcmliZShcbiAgICAgIChkcmFnOiBTdWJqZWN0PEN1cnJlbnREcmFnRGF0YT4pID0+IHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlUmVjdGFuZ2xlOiBDbGllbnRSZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnREcmFnRHJvcERhdGE6IGFueTtcbiAgICAgICAgY29uc3Qgb3ZlcmxhcHMgPSBkcmFnLnBpcGUoXG4gICAgICAgICAgbWFwKCh7IGNsaWVudFgsIGNsaWVudFksIGRyb3BEYXRhIH0pID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnREcmFnRHJvcERhdGEgPSBkcm9wRGF0YTtcbiAgICAgICAgICAgIHJldHVybiBpc0Nvb3JkaW5hdGVXaXRoaW5SZWN0YW5nbGUoXG4gICAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgICAgIGRyb3BwYWJsZVJlY3RhbmdsZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG92ZXJsYXBzQ2hhbmdlZCA9IG92ZXJsYXBzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICAgICAgbGV0IGRyYWdPdmVyQWN0aXZlOiBib29sZWFuOyAvLyBUT0RPIC0gc2VlIGlmIHRoZXJlJ3MgYSB3YXkgb2YgZG9pbmcgdGhpcyB2aWEgcnhqc1xuXG4gICAgICAgIG92ZXJsYXBzQ2hhbmdlZFxuICAgICAgICAgIC5waXBlKGZpbHRlcihvdmVybGFwc05vdyA9PiBvdmVybGFwc05vdykpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBkcmFnT3ZlckFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgZHJvcERhdGE6IGN1cnJlbnREcmFnRHJvcERhdGFcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGFwcy5waXBlKGZpbHRlcihvdmVybGFwc05vdyA9PiBvdmVybGFwc05vdykpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyLm5leHQoe1xuICAgICAgICAgICAgICBkcm9wRGF0YTogY3VycmVudERyYWdEcm9wRGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG92ZXJsYXBzQ2hhbmdlZFxuICAgICAgICAgIC5waXBlKHBhaXJ3aXNlKCkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKFtkaWRPdmVybGFwLCBvdmVybGFwc05vd10pID0+IGRpZE92ZXJsYXAgJiYgIW92ZXJsYXBzTm93KVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGRyYWdPdmVyQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmUubmV4dCh7XG4gICAgICAgICAgICAgICAgZHJvcERhdGE6IGN1cnJlbnREcmFnRHJvcERhdGFcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBkcmFnLnBpcGUobWVyZ2VNYXAoKCkgPT4gb3ZlcmxhcHMpKS5zdWJzY3JpYmUoe1xuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZHJhZ092ZXJBY3RpdmUpIHtcbiAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wLm5leHQoe1xuICAgICAgICAgICAgICAgICAgZHJvcERhdGE6IGN1cnJlbnREcmFnRHJvcERhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50RHJhZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=