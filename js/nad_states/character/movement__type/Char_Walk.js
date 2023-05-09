function Char_Walk() {
    this.initialize(...arguments);
}

Char_Walk.prototype = Object.create(Char_Type_Base.prototype);
Char_Walk.prototype.constructor = Char_Walk;

Char_Walk.prototype.initialize = function() {
    Char_Type_Base.prototype.initialize.call(this);
};

//------------------
// #region Update
//------------------

Char_Walk.prototype.update = function(character) {
    if (character.isMoving()) {
        this.updateMove(character);
    }
};

// #endregion
