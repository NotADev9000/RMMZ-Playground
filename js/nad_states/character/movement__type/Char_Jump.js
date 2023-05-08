function Char_Jump() {
    this.initialize(...arguments);
}

Char_Jump.prototype = Object.create(Char_Type_Base.prototype);
Char_Jump.prototype.constructor = Char_Jump;

Char_Jump.prototype.initialize = function(machine) {
    Char_Type_Base.prototype.initialize.call(this, machine);
};

//------------------
// #region Update
//------------------

Char_Jump.prototype.update = function(character) {
    if (character.isJumping()) {
        this.updateJump(character);
    }
};

Char_Jump.prototype.updateJump = function(character) {
    character._jumpCount--;
    character._realX =
        (character._realX * character._jumpCount + character._x) / (character._jumpCount + 1.0);
    character._realY =
        (character._realY * character._jumpCount + character._y) / (character._jumpCount + 1.0);
    character.refreshBushDepth();
    if (character._jumpCount === 0) {
        character._realX = character._x = $gameMap.roundX(character._x);
        character._realY = character._y = $gameMap.roundY(character._y);
        character.machines().movement_type.exitState_Jump();
    }
};

// #endregion
