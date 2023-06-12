function Player_Run() {
    this.initialize(...arguments);
}

Player_Run.prototype = Object.create(Char_Type_Base.prototype);
Player_Run.prototype.constructor = Player_Run;

Player_Run.prototype.initialize = function() {
    Char_Type_Base.prototype.initialize.call(this);
};

//------------------
// #region Properties
//------------------

Player_Run.prototype.realMoveSpeed = function(character) {
    return character._moveSpeed + 1;
};

// #endregion
