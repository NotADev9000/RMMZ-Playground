function State_Character_Base() {
    throw new Error("This is a static class");
}

State_Character_Base.updateStart = function() {};

State_Character_Base.updateEnd = function(character) {
    character.updateAnimation();
};
