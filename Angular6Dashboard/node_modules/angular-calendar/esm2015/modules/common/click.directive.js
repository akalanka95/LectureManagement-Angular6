/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
export class ClickDirective {
    /**
     * @param {?} renderer
     * @param {?} elm
     */
    constructor(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
            ? 'tap'
            : 'click';
        this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, event => {
            this.click.next(event);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListener();
    }
}
ClickDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlClick]'
            },] },
];
/** @nocollapse */
ClickDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
ClickDirective.propDecorators = {
    "click": [{ type: Output, args: ['mwlClick',] },],
};
function ClickDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ClickDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ClickDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ClickDirective.propDecorators;
    /** @type {?} */
    ClickDirective.prototype.click;
    /** @type {?} */
    ClickDirective.prototype.removeListener;
    /** @type {?} */
    ClickDirective.prototype.renderer;
    /** @type {?} */
    ClickDirective.prototype.elm;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTTs7Ozs7SUFLSixZQUFvQixRQUFtQixFQUFVLEdBQWU7UUFBNUMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7cUJBSlYsSUFBSSxZQUFZLEVBQUU7S0FJSjs7OztJQUVwRSxRQUFRO1FBQ04sdUJBQU0sU0FBUyxHQUNiLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXO1lBQ3RFLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN0QixTQUFTLEVBQ1QsS0FBSyxDQUFDLEVBQUU7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QixDQUNGLENBQUM7S0FDSDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7OztZQTFCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozs7WUFWQyxTQUFTO1lBQ1QsVUFBVTs7O3NCQVdULE1BQU0sU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENsaWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsbTogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudE5hbWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93WydIYW1tZXInXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyAndGFwJ1xuICAgICAgICA6ICdjbGljayc7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5jbGljay5uZXh0KGV2ZW50KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICB9XG59XG4iXX0=