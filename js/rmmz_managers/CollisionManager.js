
// CollisionManager
//
// The static class that manages collisions (hit/hurtboxes.)

function CollisionManager() {
    throw new Error("This is a static class");
}

CollisionManager.initialize = function() {
    this._collisionAreas = [[], []];
};

//------------------
// #region Setup
//------------------

CollisionManager.setup = function() {
    this.setupCollisions();
};

CollisionManager.setupCollisions = function() {
    this._collisionAreas = [[], []];
    this.setupHurtboxes();
    this.setupHitboxes();
};

CollisionManager.setupHurtboxes = function() {
    // player
    for (const hurtbox of Object.values($gamePlayer.collisionsHurt())) {
        this.addHurtbox(hurtbox);
    }
    // events
    for (const event of $gameMap.events()) {
        for (const hurtbox of Object.values(event.collisionsHurt())) {
            this.addHurtbox(hurtbox);
        }
    }
};

CollisionManager.setupHitboxes = function() {
    // player
    for (const hitbox of Object.values($gamePlayer.collisionsHit())) {
        this.addHitbox(hitbox);
    }
    // events
    for (const event of $gameMap.events()) {
        for (const hitbox of Object.values(event.collisionsHit())) {
            this.addHitbox(hitbox);
        }
    }
    // DEBUGGING ////////////////////////////////////////////////////
    this.addHitbox(
        new Game_CollisionHit(8, -16, 8, 16, $gameMap.events()[2])
    );
    this._collisionAreas[1][0]._active = true;
    this.addHitbox(
        new Game_CollisionHit(-8, -32, 16, 16, $gameMap.events()[3])
    );
    this.addHitbox(
        new Game_CollisionHit(-24, -32, 48, 48, $gameMap.events()[4])
    );
    this._collisionAreas[1][2]._active = true;
};

// #endregion

//------------------
// #region Collision Storing
//------------------

CollisionManager.collisionsHurt = function() {
    return this._collisionAreas[0];
};

CollisionManager.collisionsHit = function() {
    return this._collisionAreas[1];
};

CollisionManager.addHurtbox = function(hurtbox) {
    if (!(hurtbox instanceof Game_CollisionHurt)) {
        console.warn("Tried to add non-hurtbox to Map's list of hurtboxes: hurtbox NOT added.")
        return;
    }
    this._collisionAreas[0].push(hurtbox);
};

CollisionManager.addHitbox = function(hitbox) {
    if (!(hitbox instanceof Game_CollisionHit)) {
        console.warn("Tried to add non-hitbox to Map's list of hitboxes: hitbox NOT added.")
        return;
    }
    this._collisionAreas[1].push(hitbox);
};

// #endregion

//------------------
// #region Collision Mechanics
//------------------

CollisionManager.update = function() {
    for (const hitbox of this.collisionsHit()) {
        if (!hitbox._active) continue;

        for (const hurtbox of this.collisionsHurt()) {
            if (!hurtbox._active) continue;

            // TODO: check if hurtbox can collide with this hitbox
            if (this.rectCollideRect(
                hitbox.x, hitbox.endX(), hitbox.y, hitbox.endY(),
                hurtbox.x, hurtbox.endX(), hurtbox.y, hurtbox.endY())
            ) {
                console.log(`Collision!`);
                $gameMap._interpreter.command212([-1, 121, false]);
            }
        }
    }
};

// #endregion

//------------------
// #region Collision Checking
//------------------

CollisionManager.rectCollideRect = function(rect1_x, rect1_endX, rect1_y, rect1_endy,
                                            rect2_x, rect2_endX, rect2_y, rect2_endy) {
    return rect1_x < rect2_endX &&
           rect1_endX > rect2_x &&
           rect1_y < rect2_endy &&
           rect1_endy > rect2_y
};

// #endregion
