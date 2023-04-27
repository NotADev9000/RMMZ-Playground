function State_Event_Base() {
    throw new Error("This is a static class");
}

State_Event_Base.updateStart = function() {};

State_Event_Base.updateEnd = function(machine, character) {
    State_Character_Base.updateEnd(machine, character);
    character.checkEventTriggerAuto();
    character.updateParallel();
};
