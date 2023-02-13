
// Game_Follower
//
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.

function Game_Follower() {
    this.initialize(...arguments);
}

Game_Follower.prototype = Object.create(Game_Character.prototype);
Game_Follower.prototype.constructor = Game_Follower;

Game_Follower.prototype.initialize = function(memberIndex) {
    Game_Character.prototype.initialize.call(this);
    this._memberIndex = memberIndex;
    this.setTransparent($dataSystem.optTransparent);
    this.setThrough(true);
};

Game_Follower.prototype.refresh = function() {
    const characterName = this.isVisible() ? this.actor().characterName() : "";
    const characterIndex = this.isVisible() ? this.actor().characterIndex() : 0;
    this.setImage(characterName, characterIndex);
};

Game_Follower.prototype.actor = function() {
    return $gameParty.battleMembers()[this._memberIndex];
};

Game_Follower.prototype.isVisible = function() {
    return this.actor() && $gamePlayer.followers().isVisible();
};

Game_Follower.prototype.isGathered = function() {
    return !this.isMoving() && this.pos($gamePlayer.x, $gamePlayer.y);
};

Game_Follower.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
    this.setOpacity($gamePlayer.opacity());
    this.setBlendMode($gamePlayer.blendMode());
    this.setWalkAnime($gamePlayer.hasWalkAnime());
    this.setStepAnime($gamePlayer.hasStepAnime());
    this.setDirectionFix($gamePlayer.isDirectionFixed());
    this.setTransparent($gamePlayer.isTransparent());
};

Game_Follower.prototype.chaseCharacter = function(character) {
    const sx = this.deltaXFrom(character.x);
    const sy = this.deltaYFrom(character.y);
    if ($gameSystem.useAltMovement) {
        this.chaseMovementAlt(sx, sy, character.direction());
    } else {
        this.chaseMovement(sx, sy);
    }
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
};

Game_Follower.prototype.chaseMovement = function(sx, sy) {
    if (sx !== 0 && sy !== 0) {
        this.moveOnTheDiagonal(sx, sy);
    } else if (sx !== 0) {
        this.moveOnTheX(sx);
    } else if (sy !== 0) {
        this.moveOnTheY(sy);
    }
};

// TODO: needs fixing as doesn't work when player turns but doesn't move
Game_Follower.prototype.chaseMovementAlt = function(sx, sy, d) {
    const moveAmount = $gameSystem.moveAmount;
    const gapX = sx !== 0 && sx !== moveAmount && sx !== -moveAmount;
    const gapY = sy !== 0 && sy !== moveAmount && sy !== -moveAmount;
    if (gapX && gapY) {
        this.moveOnTheDiagonal(sx, sy);
    } else if ((sx === moveAmount || sx === -moveAmount) && (sy === moveAmount || sy === -moveAmount)) {
        if (d === 4 || d === 6) {
            this.moveOnTheY(sy);
        } else {
            this.moveOnTheX(sx);
        }
    } else if (gapX) {
        this.moveOnTheX(sx);
    } else if (gapY) {
        this.moveOnTheY(sy);
    }
};

Game_Follower.prototype.moveOnTheX = function(sx) {
    this.moveStraight(sx > 0 ? 4 : 6);
};

Game_Follower.prototype.moveOnTheY = function(sy) {
    this.moveStraight(sy > 0 ? 8 : 2);
};

Game_Follower.prototype.moveOnTheDiagonal = function(sx, sy) {
    this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
};
