import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator } from '@angular/forms';
export interface CustomOption {
    import: string;
    whitelist: Array<any>;
}
export declare class QuillEditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {
    private elementRef;
    private doc;
    private platformId;
    private renderer;
    private zone;
    quillEditor: any;
    editorElem: HTMLElement;
    emptyArray: any[];
    content: any;
    selectionChangeEvent: any;
    textChangeEvent: any;
    defaultModules: {
        toolbar: (string[] | {
            header: number;
        }[] | {
            list: string;
        }[] | {
            script: string;
        }[] | {
            indent: string;
        }[] | {
            direction: string;
        }[] | {
            size: (string | boolean)[];
        }[] | {
            header: (number | boolean)[];
        }[] | ({
            color: any[];
            background?: undefined;
        } | {
            background: any[];
            color?: undefined;
        })[] | {
            font: any[];
        }[] | {
            align: any[];
        }[])[];
    };
    format: 'object' | 'html' | 'text' | 'json';
    theme: string;
    modules: {
        [index: string]: Object;
    };
    readOnly: boolean;
    placeholder: string;
    maxLength: number;
    minLength: number;
    required: boolean;
    formats: string[];
    style: any;
    strict: boolean;
    scrollingContainer: HTMLElement | string;
    bounds: HTMLElement | string;
    customOptions: CustomOption[];
    onEditorCreated: EventEmitter<any>;
    onContentChanged: EventEmitter<any>;
    onSelectionChanged: EventEmitter<any>;
    valueGetter: (quillEditor: any, editorElement: HTMLElement) => any;
    valueSetter: (quillEditor: any, value: any, format: "object" | "html" | "json") => any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(elementRef: ElementRef, doc: any, platformId: Object, renderer: Renderer2, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(currentValue: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    validate(): {
        minLengthError?: {
            given: number;
            minLength: number;
        };
        maxLengthError?: {
            given: number;
            maxLength: number;
        };
        requiredError?: {
            empty: boolean;
        };
    };
}
