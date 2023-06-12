function Machine_Player_Movement__Type() {
    this.initialize(...arguments);
}

Machine_Player_Movement__Type.prototype = Object.create(Machine_Char_Movement__Type.prototype);
Machine_Player_Movement__Type.prototype.constructor = Machine_Player_Movement__Type;

Machine_Player_Movement__Type.prototype.initialize = function(character) {
    Machine_Char_Movement__Type.prototype.initialize.call(this, character);
};

Machine_Player_Movement__Type.prototype.initStates = function() {
    Machine_Char_Movement__Type.prototype.initStates.call(this);
    this._states.run = new Player_Run();
};

//------------------
// #region Check
//------------------

Machine_Player_Movement__Type.prototype.isState_Run = function() {
    return this._state === this._states.run;
};

// #endregion

//------------------
// #region Change
//------------------

Machine_Player_Movement__Type.prototype.changeStateTo_Run = function() {
    this.changeState(this._states.run);
};

// #endregion

//------------------
// #region Exit
//------------------

Machine_Player_Movement__Type.prototype.exitState_Run = function() {
    if (this.isState_Run()) {
        this.changeState(this.defaultState());
    }
};

// #endregion
