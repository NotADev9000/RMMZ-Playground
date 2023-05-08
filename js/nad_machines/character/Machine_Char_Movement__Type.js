function Machine_Char_Movement__Type() {
    this.initialize(...arguments);
}

Machine_Char_Movement__Type.prototype.constructor = Machine_Char_Movement__Type;

Machine_Char_Movement__Type.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = this.defaultState();
};

Machine_Char_Movement__Type.prototype.initStates = function() {
    this._states = {
        walk: new Char_Walk(),
        jump: new Char_Jump()
    };
};

//------------------
// #region Update
//------------------

Machine_Char_Movement__Type.prototype.update = function() {
    this._state.update(this._character);
};

// #endregion

//------------------
// #region Reserve
//------------------

Machine_Char_Movement__Type.prototype.defaultState = function() {
    return this._states.walk;
};

// #endregion

//------------------
// #region Change
//------------------

Machine_Char_Movement__Type.prototype.changeState = function(state) {
    this._state = state;
};

Machine_Char_Movement__Type.prototype.changeStateTo_Jump = function() {
    this.changeState(this._states.jump);
};

// #endregion

//------------------
// #region Exit
//------------------

Machine_Char_Movement__Type.prototype.exitState_Jump = function() {
    if (this._state === this._states.jump) {
        this.changeState(this.defaultState());
    }
};

// #endregion
