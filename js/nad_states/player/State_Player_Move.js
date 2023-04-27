function State_Player_Move() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: BASE

State_Player_Move.updateStart = function(machine, character) {
    const base = machine.states().base;
    base.updateStart(machine, character);
    base.wasMovingThisFrame = true;
};

State_Player_Move.update = function(machine, character) {
    State_Character_Move.update(machine, character);
};

State_Player_Move.updateEnd = function(machine, character) {
    machine.states().base.updateEnd(machine, character);
};