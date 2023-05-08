function Machine_Event_Movement__Behavior() {
    this.initialize(...arguments);
}

Machine_Event_Movement__Behavior.prototype = Object.create(Machine_Char_Movement__Behavior.prototype);
Machine_Event_Movement__Behavior.prototype.constructor = Machine_Event_Movement__Behavior;

Machine_Event_Movement__Behavior.prototype.initialize = function(character) {
    Machine_Char_Movement__Behavior.prototype.initialize.call(this, character);
};

Machine_Event_Movement__Behavior.prototype.initStates = function() {
    Machine_Char_Movement__Behavior.prototype.initStates.call(this);
    this._states.move_self = new Event_Move_Self();
};

//------------------
// #region state - Reserve
//------------------

Machine_Event_Movement__Behavior.prototype.defaultState = function() {
    return this._states.move_self;
};

// #endregion
