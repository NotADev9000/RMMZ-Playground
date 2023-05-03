function Char_Move_Forced() {
    this.initialize(...arguments);
}

Char_Move_Forced.prototype.constructor = Char_Move_Forced;

Char_Move_Forced.prototype.initialize = function(machine) {
    this._machine = machine;
};

//------------------
// #region Update
//------------------

Char_Move_Forced.prototype.update = function(character) {
    this.updateRoutineMove(character);
};

Char_Move_Forced.prototype.updateRoutineMove = function(character) {
    if (character._waitCount > 0) {
        character._waitCount--;
    } else {
        character.setMovementSuccess(true);
        const command = character._moveRoute.list[character._moveRouteIndex];
        if (command) {
            character.processMoveCommand(command);
            character.advanceMoveRouteIndex();
        }
    }
};

// #endregion
