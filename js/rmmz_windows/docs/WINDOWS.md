# Windows
UI elements that display data. They can also be controlled by the player.

<br>

## Window Sizing:
---
Values related to the size and layout of the `Window`.

<br>

## Text Display:
---
Values related to the layout of text and size of fonts.

<br>

### **Line Height:**
`Height` of the font:
<!-- insert example image here -->

<br>

### **Line Spacing:** *
`Height` of the space between rows:
<!-- insert example image here -->

<br>

### **Text Height:**
`Height` of the font *and* space between rows:
<!-- insert example image here -->

<br>

```js
Window_Base.prototype.calcTextHeight = function() {
    return this.lineHeight() + this.lineSpacing();
};

// usually assigned to the textState's height value
textState.height = this.calcTextHeight(textState);
```

<br>

## Item Display:
---
Values related to the layout of items.

<br>

### **Item Height:** *
`Height` of the items:

Items that are *only* single lines of text are equal to `Line Height`:
<!-- insert example image here -->

Items that span multiple rows and contain elements other than text will vary:
<!-- insert example image here -->

<br>

### **Spaced Item Height:** *
`Item Height` and `height` of the space between rows:
<!-- insert example image here -->

<br>

---
\* This value may vary depending on the `Window` class used.
<br>
Check used `Window`'s doc for more info.

<br>


