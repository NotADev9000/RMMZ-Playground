
// Window_ChoiceList
//
// The window used for the event command [Show Choices].

function Window_ChoiceList() {
    this.initialize(...arguments);
}

Window_ChoiceList.prototype = Object.create(Window_Command.prototype);
Window_ChoiceList.prototype.constructor = Window_ChoiceList;

Window_ChoiceList.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, new Rectangle());
    this.openness = 0;
    this.deactivate();
    this._background = 0;
    this._canRepeat = false;
};

Window_ChoiceList.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

Window_ChoiceList.prototype.start = function() {
    this.updatePlacement();
    this.updateBackground();
    this.createContents();
    this.refresh();
    this.scrollTo(0, 0);
    this.selectDefault();
    this.open();
    this.activate();
};

Window_ChoiceList.prototype.selectDefault = function() {
    this.select($gameMessage.choiceDefaultType());
};

Window_ChoiceList.prototype.updatePlacement = function() {
    this.x = this.windowX();
    this.y = this.windowY();
    this.width = this.windowWidth();
    this.height = this.windowHeight();
};

Window_ChoiceList.prototype.updateBackground = function() {
    this._background = $gameMessage.choiceBackground();
    this.setBackgroundType(this._background);
};

Window_ChoiceList.prototype.windowX = function() {
    const positionType = $gameMessage.choicePositionType();
    if (positionType === 1) {
        return (Graphics.boxWidth - this.windowWidth()) / 2;
    } else if (positionType === 2) {
        return Graphics.boxWidth - this.windowWidth();
    } else {
        return 0;
    }
};

Window_ChoiceList.prototype.windowY = function() {
    const messageY = this._messageWindow.y;
    if (messageY >= Graphics.boxHeight / 2) {
        return messageY - this.windowHeight();
    } else {
        return messageY + this._messageWindow.height;
    }
};

Window_ChoiceList.prototype.windowWidth = function() {
    const width = this.maxChoiceWidth() + this.colSpacing() + this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
};

Window_ChoiceList.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_ChoiceList.prototype.numVisibleRows = function() {
    const choices = $gameMessage.choices();
    return Math.min(choices.length, this.maxLines());
};

Window_ChoiceList.prototype.maxLines = function() {
    const messageWindow = this._messageWindow;
    const messageY = messageWindow ? messageWindow.y : 0;
    const messageHeight = messageWindow ? messageWindow.height : 0;
    const centerY = Graphics.boxHeight / 2;
    if (messageY < centerY && messageY + messageHeight > centerY) {
        return 4;
    } else {
        return 8;
    }
};

Window_ChoiceList.prototype.maxChoiceWidth = function() {
    let maxWidth = 96;
    const choices = $gameMessage.choices();
    for (const choice of choices) {
        const textWidth = this.textSizeEx(choice).width;
        const choiceWidth = Math.ceil(textWidth) + this.itemPadding() * 2;
        if (maxWidth < choiceWidth) {
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};

Window_ChoiceList.prototype.makeCommandList = function() {
    const choices = $gameMessage.choices();
    for (const choice of choices) {
        this.addCommand(choice, "choice");
    }
};

Window_ChoiceList.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width);
};

Window_ChoiceList.prototype.isCancelEnabled = function() {
    return $gameMessage.choiceCancelType() !== -1;
};

Window_ChoiceList.prototype.callOkHandler = function() {
    $gameMessage.onChoice(this.index());
    this._messageWindow.terminateMessage();
    this.close();
};

Window_ChoiceList.prototype.callCancelHandler = function() {
    $gameMessage.onChoice($gameMessage.choiceCancelType());
    this._messageWindow.terminateMessage();
    this.close();
};

