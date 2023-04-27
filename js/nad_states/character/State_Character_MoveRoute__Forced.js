function State_Character_MoveRoute__Forced() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: STOP

State_Character_MoveRoute__Forced.updateStart = function(machine, character) {
    machine.states().stop.updateStart(character);
};

State_Character_MoveRoute__Forced.update = function(machine, character) {
    character.updateRoutineMove();
    if (!character.isMoveRouteForcing()) {
        machine.readyChangeState(machine.states().idle);
    } else if (character.isMoving()) {
        machine.readyChangeState(machine.states().move, true);
    }
};

State_Character_MoveRoute__Forced.updateEnd = function(machine, character) {
    machine.states().stop.updateEnd(machine, character);
};
