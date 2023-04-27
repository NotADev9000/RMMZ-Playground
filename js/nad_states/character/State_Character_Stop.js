function State_Character_Stop() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: BASE

State_Character_Stop.updateStart = function(machine, character) {
    machine.states().base.updateStart(machine, character);
    character._stopCount++;
};

State_Character_Stop.updateEnd = function(machine, character) {
    machine.states().base.updateEnd(machine, character);
};
