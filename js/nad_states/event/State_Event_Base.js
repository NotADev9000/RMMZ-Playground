function State_Event_Base() {
    throw new Error("This is a static class");
}

State_Event_Base.updateStart = function() {};

State_Event_Base.updateEnd = function(character) {
    State_Character_Base.updateEnd(character);
    character.checkEventTriggerAuto();
    character.updateParallel();
};
