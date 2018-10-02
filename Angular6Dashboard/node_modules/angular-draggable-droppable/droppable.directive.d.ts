import { OnInit, ElementRef, OnDestroy, EventEmitter, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { DraggableHelper } from './draggable-helper.provider';
export interface DropData {
    dropData: any;
}
export declare class DroppableDirective implements OnInit, OnDestroy {
    private element;
    private draggableHelper;
    private zone;
    /**
     * Called when a draggable element starts overlapping the element
     */
    dragEnter: EventEmitter<DropData>;
    /**
     * Called when a draggable element stops overlapping the element
     */
    dragLeave: EventEmitter<DropData>;
    /**
     * Called when a draggable element is moved over the element
     */
    dragOver: EventEmitter<DropData>;
    /**
     * Called when a draggable element is dropped on this element
     */
    drop: EventEmitter<DropData>;
    currentDragSubscription: Subscription;
    constructor(element: ElementRef, draggableHelper: DraggableHelper, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
