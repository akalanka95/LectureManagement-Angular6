import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
var Quill = undefined;
var QuillEditorComponent = /** @class */ (function () {
    function QuillEditorComponent(elementRef, doc, platformId, renderer, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.doc = doc;
        this.platformId = platformId;
        this.renderer = renderer;
        this.zone = zone;
        this.emptyArray = [];
        this.defaultModules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                // toggled buttons
                ['blockquote', 'code-block'],
                [{ header: 1 }, { header: 2 }],
                // custom button values
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }],
                // outdent/indent
                [{ direction: 'rtl' }],
                // text direction
                [{ size: ['small', false, 'large', 'huge'] }],
                // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [
                    { color: this.emptyArray.slice() },
                    { background: this.emptyArray.slice() }
                ],
                // dropdown with defaults from theme
                [{ font: this.emptyArray.slice() }],
                [{ align: this.emptyArray.slice() }],
                ['clean'],
                // remove formatting button
                ['link', 'image', 'video'] // link and image, video
            ]
        };
        this.format = 'html';
        this.style = {};
        this.strict = true;
        this.customOptions = [];
        this.onEditorCreated = new EventEmitter();
        this.onContentChanged = new EventEmitter();
        this.onSelectionChanged = new EventEmitter();
        this.valueGetter = function (quillEditor, editorElement) {
            var html = editorElement.children[0].innerHTML;
            if (html === '<p><br></p>' || html === '<div><br><div>') {
                html = null;
            }
            var modelValue = html;
            if (_this.format === 'text') {
                modelValue = quillEditor.getText();
            }
            else if (_this.format === 'object') {
                modelValue = quillEditor.getContents();
            }
            else if (_this.format === 'json') {
                try {
                    modelValue = JSON.stringify(quillEditor.getContents());
                }
                catch (e) {
                    modelValue = quillEditor.getText();
                }
            }
            return modelValue;
        };
        this.valueSetter = function (quillEditor, value, format) {
            if (_this.format === 'html') {
                return quillEditor.clipboard.convert(value);
            }
            else if (_this.format === 'json') {
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return value;
                }
            }
            return value;
        };
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    QuillEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (isPlatformServer(this.platformId)) {
            return;
        }
        if (!Quill) {
            Quill = require('quill');
        }
        var toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
        var modules = this.modules || this.defaultModules;
        var placeholder = 'Insert text here ...';
        if (this.placeholder !== null && this.placeholder !== undefined) {
            placeholder = this.placeholder.trim();
        }
        if (toolbarElem) {
            modules['toolbar'] = toolbarElem;
        }
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');
        if (this.style) {
            Object.keys(this.style).forEach(function (key) {
                _this.renderer.setStyle(_this.editorElem, key, _this.style[key]);
            });
        }
        this.customOptions.forEach(function (customOption) {
            var newCustomOption = Quill.import(customOption.import);
            newCustomOption.whitelist = customOption.whitelist;
            Quill.register(newCustomOption, true);
        });
        this.quillEditor = new Quill(this.editorElem, {
            modules: modules,
            placeholder: placeholder,
            readOnly: this.readOnly || false,
            theme: this.theme || 'snow',
            formats: this.formats,
            bounds: this.bounds ? (this.bounds === 'self' ? this.editorElem : this.bounds) : this.doc.body,
            strict: this.strict,
            scrollingContainer: this.scrollingContainer
        });
        if (this.content) {
            if (this.format === 'object') {
                this.quillEditor.setContents(this.content, 'silent');
            }
            else if (this.format === 'text') {
                this.quillEditor.setText(this.content, 'silent');
            }
            else if (this.format === 'json') {
                try {
                    this.quillEditor.setContents(JSON.parse(this.content), 'silent');
                }
                catch (e) {
                    this.quillEditor.setText(this.content, 'silent');
                }
            }
            else {
                var contents = this.quillEditor.clipboard.convert(this.content);
                this.quillEditor.setContents(contents, 'silent');
            }
            this.quillEditor.history.clear();
        }
        this.onEditorCreated.emit(this.quillEditor);
        // mark model as touched if editor lost focus
        this.selectionChangeEvent = this.quillEditor.on('selection-change', function (range, oldRange, source) {
            _this.zone.run(function () {
                _this.onSelectionChanged.emit({
                    editor: _this.quillEditor,
                    range: range,
                    oldRange: oldRange,
                    source: source
                });
                if (!range) {
                    _this.onModelTouched();
                }
            });
        });
        // update model if text changes
        this.textChangeEvent = this.quillEditor.on('text-change', function (delta, oldDelta, source) {
            var text = _this.quillEditor.getText();
            var content = _this.quillEditor.getContents();
            var html = _this.editorElem.children[0].innerHTML;
            if (html === '<p><br></p>' || html === '<div><br><div>') {
                html = null;
            }
            _this.zone.run(function () {
                _this.onModelChange(_this.valueGetter(_this.quillEditor, _this.editorElem));
                _this.onContentChanged.emit({
                    editor: _this.quillEditor,
                    html: html,
                    text: text,
                    content: content,
                    delta: delta,
                    oldDelta: oldDelta,
                    source: source
                });
            });
        });
    };
    QuillEditorComponent.prototype.ngOnDestroy = function () {
        if (this.selectionChangeEvent) {
            this.selectionChangeEvent.removeListener('selection-change');
        }
        if (this.textChangeEvent) {
            this.textChangeEvent.removeListener('text-change');
        }
    };
    QuillEditorComponent.prototype.ngOnChanges = function (changes) {
        if (!this.quillEditor) {
            return;
        }
        if (changes['readOnly']) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
        if (changes['placeholder']) {
            this.quillEditor.root.dataset.placeholder =
                changes['placeholder'].currentValue;
        }
    };
    QuillEditorComponent.prototype.writeValue = function (currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                if (this.format === 'text') {
                    this.quillEditor.setText(currentValue);
                }
                else {
                    this.quillEditor.setContents(this.valueSetter(this.quillEditor, this.content, this.format));
                }
                return;
            }
            this.quillEditor.setText('');
        }
    };
    QuillEditorComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    QuillEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    QuillEditorComponent.prototype.validate = function () {
        if (!this.quillEditor) {
            return null;
        }
        var err = {}, valid = true;
        var textLength = this.quillEditor.getText().trim().length;
        if (this.minLength && textLength && textLength < this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = false;
        }
        if (this.maxLength && textLength > this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = false;
        }
        if (this.required && !textLength) {
            err.requiredError = {
                empty: true
            };
            valid = false;
        }
        return valid ? null : err;
    };
    QuillEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'quill-editor',
                    template: "\n  <ng-content select=\"[quill-editor-toolbar]\"></ng-content>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return QuillEditorComponent; }),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return QuillEditorComponent; }),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    QuillEditorComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: Renderer2, },
        { type: NgZone, },
    ]; };
    QuillEditorComponent.propDecorators = {
        "format": [{ type: Input },],
        "theme": [{ type: Input },],
        "modules": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "maxLength": [{ type: Input },],
        "minLength": [{ type: Input },],
        "required": [{ type: Input },],
        "formats": [{ type: Input },],
        "style": [{ type: Input },],
        "strict": [{ type: Input },],
        "scrollingContainer": [{ type: Input },],
        "bounds": [{ type: Input },],
        "customOptions": [{ type: Input },],
        "onEditorCreated": [{ type: Output },],
        "onContentChanged": [{ type: Output },],
        "onSelectionChanged": [{ type: Output },],
        "valueGetter": [{ type: Input },],
        "valueSetter": [{ type: Input },],
    };
    return QuillEditorComponent;
}());
export { QuillEditorComponent };
//# sourceMappingURL=quill-editor.component.js.map