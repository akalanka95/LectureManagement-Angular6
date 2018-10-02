/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { DraggableHelper } from './draggable-helper.provider';
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
export { DragAndDropModule };
function DragAndDropModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DragAndDropModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DragAndDropModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUvIiwic291cmNlcyI6WyJkcmFnLWFuZC1kcm9wLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0lBT3JELHlCQUFPOzs7SUFBZDtRQUNFLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQzdCLENBQUM7S0FDSDs7Z0JBVkYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQztpQkFDbEQ7OzRCQVJEOztTQVNhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wcGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdnYWJsZUhlbHBlciB9IGZyb20gJy4vZHJhZ2dhYmxlLWhlbHBlci5wcm92aWRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtEcmFnZ2FibGVIZWxwZXJdXG4gICAgfTtcbiAgfVxufVxuIl19