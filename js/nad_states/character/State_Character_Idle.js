function State_Character_Idle() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: STOP

State_Character_Idle.updateStart = function(machine, character) {
    machine.states().stop.updateStart(character);
};

State_Character_Idle.update = function(machine, character) {
    if (character.isMoveRouteForcing()) {
        machine.readyChangeState(machine.states().moveRoute_Forced, true);
    } else if (character.isChasing()) {
        machine.readyChangeState(machine.states().chase, true);
    }
};

State_Character_Idle.updateEnd = function(machine, character) {
    machine.states().stop.updateEnd(machine, character);
};
