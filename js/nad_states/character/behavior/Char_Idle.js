function Char_Idle() {
    this.initialize(...arguments);
}

Char_Idle.prototype.constructor = Char_Idle;

Char_Idle.prototype.initialize = function() {};

//------------------
// #region Update
//------------------

Char_Idle.prototype.update = function(character) {
    if (character.isStopping()) {
        this.updateStop(character);
    }
};

Char_Idle.prototype.updateStop = function(character) {
    character._stopCount++;
    character.machines().movement_behavior.update();
};

// #endregion