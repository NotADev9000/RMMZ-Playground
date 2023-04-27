function Machine_Character() {
    this.initialize(...arguments);
}

Machine_Character.prototype.constructor = Machine_Character;

Machine_Character.prototype.initialize = function(character) {
    this._character = character;
    this.initStates();
    this._state = this._states.idle;
    this.resetChangeState();
};

Machine_Character.prototype.initStates = function() {
    this._states = {
        base: State_Character_Base,
        stop: State_Character_Stop,
        idle: State_Character_Idle,
        moveRoute_Forced: State_Character_MoveRoute__Forced,
        chase: State_Character_Chase,
        move: State_Character_Move
    };
};

Machine_Character.prototype.states = function() {
    return this._states;
};

Machine_Character.prototype.state = function() {
    return this._state;
};

//------------------
// #region Change
//------------------

Machine_Character.prototype.readyChangeState = function(state, updateOnChange = false) {
    this._changeTo = state;
    this._updateOnChange = updateOnChange;
};

Machine_Character.prototype.resetChangeState = function() {
    this._changeTo = null;
    this._updateOnChange = false;
};

Machine_Character.prototype.changeState = function(state) {
    this._state = state;
};

// #endregion

//------------------
// #region Update
//------------------

Machine_Character.prototype.update = function() {
    this.updateStateStart();

    do {
        this.resetChangeState();
        this.updateState();
        if (this._changeTo) this.changeState(this._changeTo);
    } while (this._updateOnChange);

    this.updateStateEnd();
};

Machine_Character.prototype.updateStateStart = function() {
    this._state.updateStart(this, this._character);
};

Machine_Character.prototype.updateState = function() {
    this._state.update(this, this._character);
};

Machine_Character.prototype.updateStateEnd = function() {
    this._state.updateEnd(this, this._character);
};

// #endregion
