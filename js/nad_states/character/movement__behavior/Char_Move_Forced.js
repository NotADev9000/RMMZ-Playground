function Char_Move_Forced() {
    this.initialize(...arguments);
}

Char_Move_Forced.prototype.constructor = Char_Move_Forced;

Char_Move_Forced.prototype.initialize = function() {};

//------------------
// #region Update
//------------------

Char_Move_Forced.prototype.update = function(character) {
    character.updateRoutineMove();
};

// #endregion
