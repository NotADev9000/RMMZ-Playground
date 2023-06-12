function Player_Input() {
    this.initialize(...arguments);
}

Player_Input.prototype.constructor = Player_Input;

Player_Input.prototype.initialize = function() {};

//------------------
// #region Update
//------------------

Player_Input.prototype.update = function(character) {
    this.updateRunning(character);
    if (SceneManager.scene().isPlayerActive()) {
        this.moveByInput(character);
    }
};

// #endregion

Player_Input.prototype.updateRunning = function(character) {
    if (character.isMoving()) {
        return;
    }

    let running = false;
    // can run
    if (character.canMove() && !character.isInVehicle() && !$gameMap.isDashDisabled()) {
        // is pressing run
        running = character.isDashButtonPressed() || $gameTemp.isDestinationValid();
    }

    // update move_type state
    if (running) {
        character.machines().movement_type.changeStateTo_Run();
    } else {
        character.machines().movement_type.exitState_Run();
    }
};

Player_Input.prototype.moveByInput = function(character) {
    if (!character.isMoving() && character.canMove()) {
        let direction = character.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()) {
            const x = $gameTemp.destinationX();
            const y = $gameTemp.destinationY();
            direction = character.findDirectionTo(x, y);
        }
        if (direction > 0) {
            character.executeMove(direction);
        }
    }
};
