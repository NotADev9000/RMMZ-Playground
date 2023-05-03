function Char_Idle() {
    this.initialize(...arguments);
}

Char_Idle.prototype.constructor = Char_Idle;

Char_Idle.prototype.initialize = function(machine) {
    this._machine = machine;
};

//------------------
// #region Update
//------------------

Char_Idle.prototype.update = function(character) {
    if (character.isStopping()) {
        character._stopCount++;
        character.machines().movement_behavior.update();
    }
};

// #endregion
