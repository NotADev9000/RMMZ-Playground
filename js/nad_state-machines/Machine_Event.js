function Machine_Event() {
    this.initialize(...arguments);
}

Machine_Event.prototype = Object.create(Machine_Character.prototype);
Machine_Event.prototype.constructor = Machine_Event;

Machine_Event.prototype.initialize = function(character) {
    Machine_Character.prototype.initialize.call(this, character);
};

Machine_Event.prototype.initStates = function() {
    this._states = {
        base: State_Event_Base,
        stop: State_Event_Stop,
        idle: State_Event_Idle,
        moveRoute_Forced: State_Character_MoveRoute__Forced,
        moveRoute_Self: State_Event_MoveRoute__Self,
        chase: State_Character_Chase,
        move: State_Event_Move
    }
};
