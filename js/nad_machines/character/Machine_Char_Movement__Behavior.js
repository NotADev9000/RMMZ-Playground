function Machine_Char_Movement__Behavior() {
    this.initialize(...arguments);
}

Machine_Char_Movement__Behavior.prototype.constructor = Machine_Char_Movement__Behavior;

Machine_Char_Movement__Behavior.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = this._reservedState = this.defaultState();
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
    this._state?.update(this._character);
};

// #endregion

//------------------
// #region state - Reserve
//------------------

Machine_Char_Movement__Behavior.prototype.defaultState = function() {
    return null;
};

Machine_Char_Movement__Behavior.prototype.setReservedState = function(state) {
    this._reservedState = state;
};

// #endregion

//------------------
// #region State - Change
//------------------

Machine_Char_Movement__Behavior.prototype.changeState = function(state) {
    this._state = state;
};

Machine_Char_Movement__Behavior.prototype.changeStateTo_MoveForced = function() {
    this.changeState(this._states.move_forced);
};

Machine_Char_Movement__Behavior.prototype.changeStateTo_Chasing = function() {
    // move_forced state has priority over chasing state
    if (this._state === this._states.move_forced) {
        this.setReservedState(this._states.chasing);
    } else {
        this.changeState(this._states.chasing);
    }
};

// #endregion

//------------------
// #region State - Exit
//------------------

Machine_Char_Movement__Behavior.prototype.exitState_Chasing = function() {
    this.setReservedState(this.defaultState());
    if (this._state === this._states.chasing) {
        this.exitCurrentState();
    }
};

Machine_Char_Movement__Behavior.prototype.exitState_MoveForced = function() {
    if (this._state === this._states.move_forced) {
        this.exitCurrentState();
    }  
};

Machine_Char_Movement__Behavior.prototype.exitCurrentState = function() {
    this.changeState(this._reservedState);
};

// #endregion
