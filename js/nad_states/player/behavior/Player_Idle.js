function Player_Idle() {
    this.initialize(...arguments);
}

Player_Idle.prototype = Object.create(Char_Idle.prototype);
Player_Idle.prototype.constructor = Player_Idle;

Player_Idle.prototype.initialize = function() {
    Char_Idle.prototype.initialize.call(this);
};

//------------------
// #region Update
//------------------

Player_Idle.prototype.update = function(character) {
    Char_Idle.prototype.update.call(this, character);
};

// #endregion
