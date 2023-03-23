/*:
 * @target MZ
 * @author NotADev
 * @plugindesc Draws collision areas to screen.
 * @help
 * 
 */

//------------------
// #region Spriteset_Map
//------------------

Spriteset_Map.prototype.createUpperLayer = function() {
    this.createCollisions();
    this.createHurtboxes();
    this.createHitboxes();
    Spriteset_Base.prototype.createUpperLayer.call(this);
};

Spriteset_Map.prototype.createCollisions = function() {
    this._collisionsContainer = new Sprite();
    this._collisionsContainer.z = 10;
    this._tilemap.addChild(this._collisionsContainer);
};

Spriteset_Map.prototype.createHurtboxes = function() {
    for (const hurtbox of CollisionManager.collisionsHurt()) {
        const sprite = new Sprite_Collision(hurtbox);
        sprite.bitmap = new Bitmap(0, 0);
        this._collisionsContainer.addChild(sprite);
    }
};

Spriteset_Map.prototype.createHitboxes = function() {
    for (const hitbox of CollisionManager.collisionsHit()) {
        const sprite = new Sprite_Collision(hitbox);
        sprite.bitmap = new Bitmap(0, 0);
        this._collisionsContainer.addChild(sprite);
    }
};

// #endregion

//------------------
// #region Sprite_Collision
//------------------

// Sprite_Collision
//
// The sprite for displaying a character.

function Sprite_Collision() {
    this.initialize(...arguments);
}

Sprite_Collision.prototype = Object.create(Sprite.prototype);
Sprite_Collision.prototype.constructor = Sprite_Collision;

Sprite_Collision.prototype.initialize = function(area) {
    Sprite.prototype.initialize.call(this);
    this.initMembers(area);
};

Sprite_Collision.prototype.initMembers = function(area) {
    this._collisionArea = area;
    this._isHurtbox = area instanceof Game_CollisionHurt;
};

Sprite_Collision.prototype.update = function() {
    const hurt = this._isHurtbox;
    let show = $debugData._drawCollisionAreas;
    show = show && (hurt ? $debugData._drawHurtboxes : $debugData._drawHitboxes);
    if (hurt) {
        show = show && (this._collisionArea._active ? $debugData._drawActiveHurtboxes : $debugData._drawInactiveHurtboxes);
    } else {
        show = show && (this._collisionArea._active ? $debugData._drawActiveHitboxes : $debugData._drawInactiveHitboxes);
    }

    if (!show) {
        this.hide();
        return;
    }

    this.show();
    Sprite.prototype.update.call(this);
    this.updateBitmap()
    this.updatePosition();
};

Sprite_Collision.prototype.updateBitmap = function() {
    const w = this._collisionArea._width;
    const h = this._collisionArea._height;
    const c = this.getColor();
    this.bitmap.resize(w, h);
    this.bitmap.fillRect(0, 0, w, h, c);
    this.setFrame(0, 0, w, h);
};

Sprite_Collision.prototype.updatePosition = function() {
    this.x = this._collisionArea.x;
    this.y = this._collisionArea.y;
};

Sprite_Collision.prototype.getColor = function() {
    const boxText = this._isHurtbox ? 'hurt' : 'hit';
    const activeText = this._collisionArea._active ? 'Active' : 'Inactive';
    return ColorManager[`${boxText}box${activeText}Color`]();
};

// #endregion

//------------------
// #region ColorManager
//------------------

ColorManager.hurtboxActiveColor = function() {
    return "rgba(0, 225, 60, 0.75)";
};

ColorManager.hurtboxInactiveColor = function() {
    return "rgba(0, 60, 225, 0.75)";
};

ColorManager.hitboxActiveColor = function() {
    return "rgba(225, 20, 0, 0.75)";
};

ColorManager.hitboxInactiveColor = function() {
    return "rgba(225, 200, 0, 0.75)";
};

// #endregion
