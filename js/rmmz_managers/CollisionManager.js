
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
    for (const hurtbox of $gamePlayer.collisionsHurt()) {
        this.addHurtbox(hurtbox);
    }
    // events
    for (const event of $gameMap.events()) {
        for (const hurtbox of event.collisionsHurt()) {
            this.addHurtbox(hurtbox);
        }
    }
};

CollisionManager.setupHitboxes = function() {
    // player
    for (const hitbox of $gamePlayer.collisionsHit()) {
        this.addHitbox(hitbox);
    }
    // events
    for (const event of $gameMap.events()) {
        for (const hitbox of event.collisionsHit()) {
            this.addHitbox(hitbox);
        }
    }
};

// #endregion

//------------------
// #region Manipulate Collisions
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
    this._collisionAreas[0].push(hitbox);
};

// #endregion
