function Machine_Player_Movement__Behavior() {
    this.initialize(...arguments);
}

Machine_Player_Movement__Behavior.prototype = Object.create(Machine_Char_Movement__Behavior.prototype);
Machine_Player_Movement__Behavior.prototype.constructor = Machine_Player_Movement__Behavior;

Machine_Player_Movement__Behavior.prototype.initialize = function(character) {
    Machine_Char_Movement__Behavior.prototype.initialize.call(this, character);
};

Machine_Player_Movement__Behavior.prototype.initStates = function() {
    Machine_Char_Movement__Behavior.prototype.initStates.call(this);
    this._states.input = new Player_Input();
};

//------------------
// #region state - Reserve
//------------------

Machine_Player_Movement__Behavior.prototype.defaultState = function() {
    return this._states.input;
};

// #endregion
