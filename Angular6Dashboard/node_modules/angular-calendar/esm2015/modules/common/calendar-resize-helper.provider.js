/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { isInside } from './util';
export class CalendarResizeHelper {
    /**
     * @param {?} resizeContainerElement
     * @param {?=} minWidth
     */
    constructor(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    validateResize({ rectangle }) {
        if (this.minWidth && rectangle.width < this.minWidth) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}
function CalendarResizeHelper_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarResizeHelper.prototype.resizeContainerElement;
    /** @type {?} */
    CalendarResizeHelper.prototype.minWidth;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE1BQU07Ozs7O0lBQ0osWUFDVSx3QkFDQTtRQURBLDJCQUFzQixHQUF0QixzQkFBc0I7UUFDdEIsYUFBUSxHQUFSLFFBQVE7S0FDZDs7Ozs7SUFFSixjQUFjLENBQUMsRUFBRSxTQUFTLEVBQTZCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUNiLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUNuRCxTQUFTLENBQ1YsQ0FBQztLQUNIO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0luc2lkZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclJlc2l6ZUhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzaXplQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBtaW5XaWR0aD86IG51bWJlclxuICApIHt9XG5cbiAgdmFsaWRhdGVSZXNpemUoeyByZWN0YW5nbGUgfTogeyByZWN0YW5nbGU6IENsaWVudFJlY3QgfSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1pbldpZHRoICYmIHJlY3RhbmdsZS53aWR0aCA8IHRoaXMubWluV2lkdGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNJbnNpZGUoXG4gICAgICB0aGlzLnJlc2l6ZUNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICByZWN0YW5nbGVcbiAgICApO1xuICB9XG59XG4iXX0=