# Windows
UI elements for displaying menus.

![window example](images/example-window.png =x128)

<br>

## Window Sizing:
---
Values related to the size and position of the `Window`.

<br>

## Content Sizing:
---
Values related to the size, layout and position of content inside the `Window`.

<details>
<summary>Frame Padding:</summary>

`Padding` between the *edge* of the `Window` and the `Contents`.

![window Frame Padding](images/example-frame_padding.png =x128)

<br>

**useage:**

```js
// function that is called when the window is created
Window_Base.prototype.framePadding = function() {
    return 3;
};

Window_Base.prototype.initialize = function(rect) {
    // ...
    this.updatePadding();
    // ...
};

Window_Base.prototype.updatePadding = function() {
    this.padding = this.framePadding();
};

// sets the window's '_padding' property
// this property is used to calculate drawable area of window
Object.defineProperty(Window.prototype, "padding", {
    get: function() {
        return this._padding;
    },
    set: function(value) {
        this._padding = value;
        this._refreshAllParts();
    },
    configurable: true
});
```
</details>

<br>

<details>
<summary>Position Padding:</summary>

`Padding` between the `Frame Padding` and the `Window`'s *drawn* elements.
<br>
Can have different values for horizontal & vertical `Padding`.

![window Position Padding](images/example-position_padding.png =x128)

<br>

**useage:**

```js
// functions called
Window_Base.prototype.positionPaddingX = function() {
    return 5;
};

Window_Base.prototype.positionPaddingY = function() {
    return 8;
};

// functions are called when drawing elements to window
// this aligns the elements to the correct position
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    x += this.positionPaddingX();
    y += this.positionPaddingY();
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};
```
</details>

<br>

## Text Display:
---
Values related to the layout of text.

<details>
<summary>Line Height:</summary>

`Height` of the font:

![window Line Height](images/example-line_height.png =x128)
</details>

<br>

<details>
<summary>Line Spacing:</summary>

`Height` of the space between rows:

![window Line Spacing](images/example-line_spacing.png =x128)
</details>

<br>

<details>
<summary>Text Height:</summary>

`Height` of the font *and* space between rows:

![window Text Height](images/example-text_height.png =x128)

<br>

**useage:**
```js
Window_Base.prototype.calcTextHeight = function() {
    return this.lineHeight() + this.lineSpacing();
};

// usually assigned to the textState's height value
textState.height = this.calcTextHeight(textState);
```
</details>

<br>

## Item Display:
---
Values related to the layout of items.

<details>
<summary>Item Height:</summary>

`Height` of the items

Items that are *only* single lines of text are equal to `Line Height`:

![window Item Height](images/example-line_height.png =x128)

Items that span multiple rows and contain elements other than text will vary:
<!-- insert example image here -->
</details>

<br>

<details>
<summary>Spaced Item Height:</summary>

`Item Height` and `height` of the space between rows:

![window Spaced Item Height](images/example-text_height.png =x128)
</details>

<br>
