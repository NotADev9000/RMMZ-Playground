function State_Event_Stop() {
    throw new Error("This is a static class");
}

// STATE INHERITANCE: BASE

State_Event_Stop.updateStart = function(character) {
    if (character._locked) character.resetStopCount();
    State_Character_Stop.updateStart(character);
};

State_Event_Stop.updateEnd = function(machine, character) {
    machine.states().base.updateEnd(character);
};