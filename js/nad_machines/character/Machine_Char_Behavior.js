function Machine_Char_Behavior() {
    this.initialize(...arguments);
}

Machine_Char_Behavior.prototype.constructor = Machine_Char_Behavior;

Machine_Char_Behavior.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = this._states.idle;
};

Machine_Char_Behavior.prototype.initStates = function() {
    this._states = {
        idle: new Char_Idle()
    };
};

//------------------
// #region Update
//------------------

Machine_Char_Behavior.prototype.update = function() {
    this._state.update(this._character);
};

// #endregion
