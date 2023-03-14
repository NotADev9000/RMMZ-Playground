
// Game_CollisionHurt
//
// The class for hurtboxes.

function Game_CollisionHurt() {
    this.initialize(...arguments);
}

Game_CollisionHurt.prototype = Object.create(Game_CollisionArea.prototype);
Game_CollisionHurt.prototype.constructor = Game_CollisionHurt;

Game_CollisionHurt.prototype.initialize = function(x, y, width, height, owner) {
    Game_CollisionArea.prototype.initialize.call(this, x, y, width, height, owner);
};