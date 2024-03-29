
// Game_CollisionArea
//
// The superclass for hitboxes & hurtboxes.
//
// Note: Not used for tile & event collisions 

function Game_CollisionArea() {
    this.initialize(...arguments);
}

Object.defineProperties(Game_CollisionArea.prototype, {
    x: {
        get: function() {
            if (this._owner) {
                return this._owner.screenX() + this._xOffset;
            }

            return this._xOffset;
        },
        configurable: true
    },
    y: {
        get: function() {
            if (this._owner) {
                return this._owner.screenY() + this._yOffset;
            }

            return this._yOffset;
        },
        configurable: true
    }
});

Game_CollisionArea.prototype.constructor = Game_CollisionArea;

Game_CollisionArea.prototype.initialize = function(xOffset = 0, yOffset = 0, width = 0, height = 0, owner = null) {
    this._xOffset = xOffset;
    this._yOffset = yOffset;
    this._width = width;
    this._height = height;
    this._owner = owner;
    this._active = false;
    // tag/layer to determine which collisions to ignore
};

Game_CollisionArea.prototype.endX = function() {
    return this.x + (this._width - 1);
};

Game_CollisionArea.prototype.endY = function() {
    return this.y + (this._height - 1);
};
