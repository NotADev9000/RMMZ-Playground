function Machine_Char_Movement__Behavior() {
    this.initialize(...arguments);
}

Machine_Char_Movement__Behavior.prototype.constructor = Machine_Char_Movement__Behavior;

Machine_Char_Movement__Behavior.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = null;
};

Machine_Char_Movement__Behavior.prototype.initStates = function() {
    this._states = {
        move_forced: new Char_Move_Forced(),
        chasing: new Char_Chasing()
    };
};

//------------------
// #region Update
//------------------

Machine_Char_Movement__Behavior.prototype.update = function() {
    this._state.update(this._character);
};

// #endregion
