import { OnInit, ElementRef, Renderer2, EventEmitter, OnDestroy, OnChanges, NgZone, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { DraggableHelper } from './draggable-helper.provider';
export interface Coordinates {
    x: number;
    y: number;
}
export interface DragAxis {
    x: boolean;
    y: boolean;
}
export interface SnapGrid {
    x?: number;
    y?: number;
}
export declare type ValidateDrag = (coordinates: Coordinates) => boolean;
export interface PointerEvent {
    clientX: number;
    clientY: number;
    event: MouseEvent | TouchEvent;
}
export declare class DraggableDirective implements OnInit, OnChanges, OnDestroy {
    element: ElementRef;
    private renderer;
    private draggableHelper;
    private zone;
    /**
     * an object of data you can pass to the drop event
     */
    dropData: any;
    /**
     * The axis along which the element is draggable
     */
    dragAxis: DragAxis;
    /**
     * Snap all drags to an x / y grid
     */
    dragSnapGrid: SnapGrid;
    /**
     * Show a ghost element that shows the drag when dragging
     */
    ghostDragEnabled: boolean;
    /**
     * Allow custom behaviour to control when the element is dragged
     */
    validateDrag: ValidateDrag;
    /**
     * The cursor to use when dragging the element
     */
    dragCursor: string;
    /**
     * Called when the element can be dragged along one axis and has the mouse or pointer device pressed on it
     */
    dragPointerDown: EventEmitter<Coordinates>;
    /**
     * Called when the element has started to be dragged.
     * Only called after at least one mouse or touch move event
     */
    dragStart: EventEmitter<Coordinates>;
    /**
     * Called when the element is being dragged
     */
    dragging: EventEmitter<Coordinates>;
    /**
     * Called after the element is dragged
     */
    dragEnd: EventEmitter<Coordinates>;
    /**
     * @hidden
     */
    pointerDown: Subject<PointerEvent>;
    /**
     * @hidden
     */
    pointerMove: Subject<PointerEvent>;
    /**
     * @hidden
     */
    pointerUp: Subject<PointerEvent>;
    private eventListenerSubscriptions;
    /**
     * @hidden
     */
    constructor(element: ElementRef, renderer: Renderer2, draggableHelper: DraggableHelper, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private checkEventListeners();
    private onMouseDown(event);
    private onMouseUp(event);
    private onTouchStart(event);
    private onTouchEnd(event);
    private onMouseEnter();
    private onMouseLeave();
    private setCssTransform(value);
    private canDrag();
    private setCursor(value);
    private unsubscribeEventListeners();
}
