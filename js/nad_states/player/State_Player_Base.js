function State_Player_Base() {
    throw new Error("This is a static class");
}

State_Player_Base.lastScrolledX = 0;
State_Player_Base.lastScrolledY = 0;
State_Player_Base.wasMovingThisFrame = false;

State_Player_Base.updateStart = function(machine, character) {
    State_Player_Base.lastScrolledX = character.scrolledX();
    State_Player_Base.lastScrolledY = character.scrolledY();
};

State_Player_Base.updateEnd = function(machine, character) {
    State_Character_Base.updateEnd(machine, character);
    character.updateScroll(State_Player_Base.lastScrolledX, State_Player_Base.lastScrolledY);
    character.updateVehicle();
    if (machine.state() !== machine.states().move) {
        character.updateNonMoving(State_Player_Base.wasMovingThisFrame)
    }
    character._followers.update();
};
