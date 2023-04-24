function State_Character_Chase() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: STOP

State_Character_Chase.updateStart = function(machine, character) {
    machine.states().stop.updateStart(character);
};

State_Character_Chase.update = function(machine, character) {
    if (character.isMoveRouteForcing() || !character.isChasing()) {
        machine.readyChangeState(machine.states().idle, true);
    } else {
        character.updateChase();
        if (character.isMoving()) machine.readyChangeState(machine.states().move, true);
    }
};

State_Character_Chase.updateEnd = function(machine, character) {
    machine.states().stop.updateEnd(character);
};
