
// Window_Command_Modular
//
// The superclass of windows for selecting a command.

function Window_Command_Modular() {
    this.initialize(...arguments);
}

Window_Command_Modular.prototype = Object.create(Window_Command.prototype);
Window_Command_Modular.prototype.constructor = Window_Command_Modular;

Window_Command_Modular.prototype.initialize = function(rect, commands) {
    this._commands = commands;
    Window_Command.prototype.initialize.call(this, rect);
    this.updateWidth();
};

//------------------
// #region Window Sizing
//------------------

Window_Command_Modular.prototype.updateWidth = function() {
    this.width = this.fittingWidth(this.getLongestCommandWidth());
    this.refresh();
    this.reselect();
};

// #endregion

//------------------
// #region Data - Items
//------------------

Window_Command_Modular.prototype.makeCommandList = function() {
    for (const command of this._commands) {
        this.addCommand(command, command);
    }
};

Window_Command_Modular.prototype.getLongestCommandWidth = function() {
    return this._commands.reduce(
        (accumulator, curValue) => {
            return Math.max(accumulator, this.textWidth(curValue));
        },
        0
    );
};

// #endregion