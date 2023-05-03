function Char_Type_Base() {
    this.initialize(...arguments);
}

Char_Type_Base.prototype.initialize = function(machine) {
    this._machine = machine;
};

//------------------
// #region Update
//------------------

Char_Type_Base.prototype.update = function() {};

Char_Type_Base.prototype.updateMove = function(character) {
    if (character._x < character._realX) {
        character._realX = Math.max(character._realX - this.distancePerFrame(character), character._x);
    }
    if (character._x > character._realX) {
        character._realX = Math.min(character._realX + this.distancePerFrame(character), character._x);
    }
    if (character._y < character._realY) {
        character._realY = Math.max(character._realY - this.distancePerFrame(character), character._y);
    }
    if (character._y > character._realY) {
        character._realY = Math.min(character._realY + this.distancePerFrame(character), character._y);
    }
    if (!character.isMoving()) {
        character.refreshBushDepth();
    }
};

// #endregion

//------------------
// #region Properties
//------------------

Char_Type_Base.prototype.realMoveSpeed = function(character) {
    return character._moveSpeed;
};

Char_Type_Base.prototype.distancePerFrame = function(character) {
    return Math.pow(2, character.realMoveSpeed(character)) / 256;
};

// #endregion
