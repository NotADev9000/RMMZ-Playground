function State_Character_MoveRoute__Self() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: STOP

State_Event_MoveRoute__Self.updateStart = function(machine, character) {
    machine.states().stop.updateStart(character);
};

State_Event_MoveRoute__Self.update = function(machine, character) {
    if (character.isMoveRouteForcing() || character.isChasing()) {
        machine.readyChangeState(machine.states().idle, true);
    } else {
        character.updateSelfMovement();
        if (character.isMoving()) machine.readyChangeState(machine.states().move, true);
    }
};

State_Event_MoveRoute__Self.updateEnd = function(machine, character) {
    machine.states().stop.updateEnd(machine, character);
};
