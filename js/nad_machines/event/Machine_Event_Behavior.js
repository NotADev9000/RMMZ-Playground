function Machine_Event_Behavior() {
    this.initialize(...arguments);
}

Machine_Event_Behavior.prototype = Object.create(Machine_Char_Behavior.prototype);
Machine_Event_Behavior.prototype.constructor = Machine_Event_Behavior;

Machine_Event_Behavior.prototype.initialize = function(character) {
    Machine_Char_Behavior.prototype.initialize.call(this, character);
};

Machine_Event_Behavior.prototype.initStates = function() {
    this._states = {
        idle: new Event_Idle()
    };
};
