function Event_Move_Self() {
    this.initialize(...arguments);
}

Event_Move_Self.prototype.constructor = Event_Move_Self;

Event_Move_Self.prototype.initialize = function(machine) {
    this._machine = machine;
};

//------------------
// #region Update
//------------------

Event_Move_Self.prototype.update = function(character) {
    this.updateSelfMovement(character);
};

Event_Move_Self.prototype.updateSelfMovement = function(character) {
    if (
        !character._locked &&
        character.isNearTheScreen() &&
        character.checkStop(character.stopCountThreshold())
    ) {
        switch (character._moveType) {
            case 1:
                character.moveTypeRandom();
                break;
            case 2:
                character.moveTypeTowardPlayer();
                break;
            case 3:
                character.moveTypeCustom();
                break;
        }
    }
};

// #endregion
