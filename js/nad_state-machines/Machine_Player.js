function Machine_Player() {
    this.initialize(...arguments);
}

Machine_Player.prototype = Object.create(Machine_Character.prototype);
Machine_Player.prototype.constructor = Machine_Player;

Machine_Player.prototype.initialize = function(character) {
    Machine_Character.prototype.initialize.call(this, character);
};

Machine_Player.prototype.initStates = function() {
    this._states = {
        base: State_Player_Base,
        stop: State_Character_Stop,
        idle: State_Character_Idle,
        moveRoute_Forced: State_Character_MoveRoute__Forced,
        chase: State_Character_Chase,
        move: State_Player_Move
    }
};
