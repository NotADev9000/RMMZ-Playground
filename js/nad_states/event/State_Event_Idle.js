function State_Event_Idle() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: STOP

State_Event_Idle.updateStart = function(machine, character) {
    machine.states().stop.updateStart(character);
};

State_Event_Idle.update = function(machine, character) {
    State_Character_Idle.update(machine, character);
    if (!character.isChasing() && !character.isMoveRouteForcing()) {
        machine.readyChangeState(machine.states().moveRoute_Self, true);
    }
};

State_Event_Idle.updateEnd = function(machine, character) {
    machine.states().stop.updateEnd(machine, character);
};
