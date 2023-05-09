function Event_Idle() {
    this.initialize(...arguments);
}

Event_Idle.prototype = Object.create(Char_Idle.prototype);
Event_Idle.prototype.constructor = Event_Idle;

Event_Idle.prototype.initialize = function() {
    Char_Idle.prototype.initialize.call(this);
};

//------------------
// #region Update
//------------------

Event_Idle.prototype.updateStop = function(character) {
    if (character._locked) character.resetStopCount();
    Char_Idle.prototype.updateStop.call(this, character);
};

// #endregion
