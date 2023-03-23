
// Game_CollisionHit
//
// The class for hitboxes.

function Game_CollisionHit() {
    this.initialize(...arguments);
}

Game_CollisionHit.prototype = Object.create(Game_CollisionArea.prototype);
Game_CollisionHit.prototype.constructor = Game_CollisionHit;

Game_CollisionHit.prototype.initialize = function(x, y, width, height, owner) {
    Game_CollisionArea.prototype.initialize.call(this, x, y, width, height, owner);
};