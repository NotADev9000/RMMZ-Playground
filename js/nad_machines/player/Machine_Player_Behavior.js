function Machine_Player_Behavior() {
    this.initialize(...arguments);
}

Machine_Player_Behavior.prototype = Object.create(Machine_Char_Behavior.prototype);
Machine_Player_Behavior.prototype.constructor = Machine_Player_Behavior;

Machine_Player_Behavior.prototype.initialize = function(character) {
    Machine_Char_Behavior.prototype.initialize.call(this, character);
};

Machine_Player_Behavior.prototype.initStates = function() {
    this._states = {
        idle: new Player_Idle()
    };
};
