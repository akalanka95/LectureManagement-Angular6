/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
var ClickDirective = /** @class */ (function () {
    function ClickDirective(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
            ? 'tap'
            : 'click';
        this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, function (event) {
            _this.click.next(event);
        });
    };
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListener();
    };
    ClickDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlClick]'
                },] },
    ];
    /** @nocollapse */
    ClickDirective.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    ClickDirective.propDecorators = {
        "click": [{ type: Output, args: ['mwlClick',] },],
    };
    return ClickDirective;
}());
export { ClickDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7O0lBVXJCLHdCQUFvQixRQUFtQixFQUFVLEdBQWU7UUFBNUMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7cUJBSlYsSUFBSSxZQUFZLEVBQUU7S0FJSjs7OztJQUVwRSxpQ0FBUTs7O0lBQVI7UUFBQSxpQkFZQztRQVhDLHFCQUFNLFNBQVMsR0FDYixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVztZQUN0RSxDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDdEIsU0FBUyxFQUNULFVBQUEsS0FBSztZQUNILEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCLENBQ0YsQ0FBQztLQUNIOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFWQyxTQUFTO2dCQUNULFVBQVU7OzswQkFXVCxNQUFNLFNBQUMsVUFBVTs7eUJBZHBCOztTQWFhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2xpY2tdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlja0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgnbXdsQ2xpY2snKSBjbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbiAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50TmFtZTogc3RyaW5nID1cbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3dbJ0hhbW1lciddICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/ICd0YXAnXG4gICAgICAgIDogJ2NsaWNrJztcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgZXZlbnROYW1lLFxuICAgICAgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLmNsaWNrLm5leHQoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gIH1cbn1cbiJdfQ==