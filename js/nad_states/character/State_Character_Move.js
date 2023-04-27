function State_Character_Move() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: BASE

State_Character_Move.updateStart = function() {};

State_Character_Move.update = function(machine, character) {
    character.updateMove();
    if (!character.isMoving()) machine.readyChangeState(machine.states().idle);
};

State_Character_Move.updateEnd = function(machine, character) {
    machine.states().base.updateEnd(machine, character);
};
