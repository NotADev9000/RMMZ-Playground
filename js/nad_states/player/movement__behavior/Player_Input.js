function Player_Input() {
    this.initialize(...arguments);
}

Player_Input.prototype.constructor = Player_Input;

Player_Input.prototype.initialize = function() {};

//------------------
// #region Update
//------------------

Player_Input.prototype.update = function(character) {
    // add update dashing
    if (SceneManager.scene().isPlayerActive()) {
        this.moveByInput(character);
    }
};

// #endregion

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
