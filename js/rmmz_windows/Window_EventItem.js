
// Window_EventItem
//
// The window used for the event command [Select Item].

function Window_EventItem() {
    this.initialize(...arguments);
}

Window_EventItem.prototype = Object.create(Window_ItemList.prototype);
Window_EventItem.prototype.constructor = Window_EventItem;

Window_EventItem.prototype.initialize = function(rect) {
    Window_ItemList.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.deactivate();
    this.setHandler("ok", this.onOk.bind(this));
    this.setHandler("cancel", this.onCancel.bind(this));
};

Window_EventItem.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

Window_EventItem.prototype.start = function() {
    this.refresh();
    this.updatePlacement();
    this.forceSelect(0);
    this.open();
    this.activate();
};

Window_EventItem.prototype.updatePlacement = function() {
    if (this._messageWindow.y >= Graphics.boxHeight / 2) {
        this.y = 0;
    } else {
        this.y = Graphics.boxHeight - this.height;
    }
};

Window_EventItem.prototype.includes = function(item) {
    const itypeId = $gameMessage.itemChoiceItypeId();
    return DataManager.isItem(item) && item.itypeId === itypeId;
};

Window_EventItem.prototype.needsNumber = function() {
    const itypeId = $gameMessage.itemChoiceItypeId();
    if (itypeId === 2) {
        // Key Item
        return $dataSystem.optKeyItemsNumber;
    } else if (itypeId >= 3) {
        // Hidden Item
        return false;
    } else {
        // Normal Item
        return true;
    }
};

Window_EventItem.prototype.isEnabled = function(/*item*/) {
    return true;
};

Window_EventItem.prototype.onOk = function() {
    const item = this.item();
    const itemId = item ? item.id : 0;
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
};

Window_EventItem.prototype.onCancel = function() {
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), 0);
    this._messageWindow.terminateMessage();
    this.close();
};

