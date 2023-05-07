function Char_Chasing() {
    this.initialize(...arguments);
}

Char_Chasing.prototype.constructor = Char_Chasing;

Char_Chasing.prototype.initialize = function(machine) {
    this._machine = machine;
};

//------------------
// #region Update
//------------------

Char_Chasing.prototype.update = function(character) {
    this.updateChasing(character);
};

Char_Chasing.prototype.updateChasing = function(character) {
    character.updateTargetPos();
    if (character.hasValidTargets()) {
        const direction = character.findDirectionTo(character._targetX, character._targetY);
        character.moveStraight(direction, false);
    }
};

// #endregion
