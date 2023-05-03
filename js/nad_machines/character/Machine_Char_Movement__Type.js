function Machine_Char_Movement__Type() {
    this.initialize(...arguments);
}

Machine_Char_Movement__Type.prototype.constructor = Machine_Char_Movement__Type;

Machine_Char_Movement__Type.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = null;
};

Machine_Char_Movement__Type.prototype.initStates = function() {
    this._states = {
        walk: null,
        jump: null
    };
};

//------------------
// #region Update
//------------------

Machine_Char_Movement__Type.prototype.update = function() {
    this._state.update(this._character);
};

// #endregion
