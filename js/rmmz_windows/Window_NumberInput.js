
// Window_NumberInput
//
// The window used for the event command [Input Number].

function Window_NumberInput() {
    this.initialize(...arguments);
}

Window_NumberInput.prototype = Object.create(Window_Selectable.prototype);
Window_NumberInput.prototype.constructor = Window_NumberInput;

Window_NumberInput.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.call(this, new Rectangle());
    this._number = 0;
    this._maxDigits = 1;
    this.openness = 0;
    this.deactivate();
    this._canRepeat = false;
};

Window_NumberInput.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

Window_NumberInput.prototype.start = function() {
    this._maxDigits = $gameMessage.numInputMaxDigits();
    this._number = $gameVariables.value($gameMessage.numInputVariableId());
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
};

Window_NumberInput.prototype.updatePlacement = function() {
    const messageY = this._messageWindow.y;
    const spacing = 8;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height - spacing;
    } else {
        this.y = messageY + this._messageWindow.height + spacing;
    }
};

Window_NumberInput.prototype.windowWidth = function() {
    const totalItemWidth = this.maxCols() * this.itemWidth();
    return totalItemWidth + this.padding * 2;
};

Window_NumberInput.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NumberInput.prototype.maxCols = function() {
    return this._maxDigits;
};

Window_NumberInput.prototype.maxItems = function() {
    return this._maxDigits;
};

Window_NumberInput.prototype.itemWidth = function() {
    return 48;
};

Window_NumberInput.prototype.itemRect = function(index) {
    const rect = Window_Selectable.prototype.itemRect.call(this, index);
    const innerMargin = this.innerWidth - this.maxCols() * this.itemWidth();
    rect.x += innerMargin / 2;
    return rect;
};

Window_NumberInput.prototype.isScrollEnabled = function() {
    return false;
};

Window_NumberInput.prototype.isHoverEnabled = function() {
    return false;
};

Window_NumberInput.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processDigitChange();
};

Window_NumberInput.prototype.processDigitChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated("up")) {
            this.changeDigit(true);
        } else if (Input.isRepeated("down")) {
            this.changeDigit(false);
        }
    }
};

Window_NumberInput.prototype.changeDigit = function(up) {
    const index = this.index();
    const place = Math.pow(10, this._maxDigits - 1 - index);
    let n = Math.floor(this._number / place) % 10;
    this._number -= n * place;
    if (up) {
        n = (n + 1) % 10;
    } else {
        n = (n + 9) % 10;
    }
    this._number += n * place;
    this.refresh();
    this.playCursorSound();
};

Window_NumberInput.prototype.isTouchOkEnabled = function() {
    return false;
};

Window_NumberInput.prototype.isOkEnabled = function() {
    return true;
};

Window_NumberInput.prototype.isCancelEnabled = function() {
    return false;
};

Window_NumberInput.prototype.processOk = function() {
    this.playOkSound();
    $gameVariables.setValue($gameMessage.numInputVariableId(), this._number);
    this._messageWindow.terminateMessage();
    this.updateInputData();
    this.deactivate();
    this.close();
};

Window_NumberInput.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    const align = "center";
    const s = this._number.padZero(this._maxDigits);
    const c = s.slice(index, index + 1);
    this.resetTextColor();
    this.drawText(c, rect.x, rect.y, rect.width, align);
};
