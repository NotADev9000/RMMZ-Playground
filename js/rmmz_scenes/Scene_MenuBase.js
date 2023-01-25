
// Scene_MenuBase
//
// The superclass of all the menu-type scenes.

function Scene_MenuBase() {
    this.initialize(...arguments);
}

Scene_MenuBase.prototype = Object.create(Scene_Base.prototype);
Scene_MenuBase.prototype.constructor = Scene_MenuBase;

Scene_MenuBase.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_MenuBase.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.updateActor();
    this.createWindowLayer();
};

Scene_MenuBase.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
};

Scene_MenuBase.prototype.helpAreaTop = function() {
    return this.isBottomHelpMode() ? this.mainAreaBottom() : 0;
};

Scene_MenuBase.prototype.helpAreaBottom = function() {
    return this.helpAreaTop() + this.helpAreaHeight();
};

Scene_MenuBase.prototype.helpAreaHeight = function() {
    return this.calcWindowHeight(2, Window_Help);
};

Scene_MenuBase.prototype.mainAreaTop = function() {
    return this.isBottomHelpMode() ? 0 : this.helpAreaBottom();
};

Scene_MenuBase.prototype.mainAreaBottom = function() {
    return this.mainAreaTop() + this.mainAreaHeight();
};

Scene_MenuBase.prototype.mainAreaHeight = function() {
    return Graphics.boxHeight - this.helpAreaHeight();
};

Scene_MenuBase.prototype.actor = function() {
    return this._actor;
};

Scene_MenuBase.prototype.updateActor = function() {
    this._actor = $gameParty.menuActor();
};

Scene_MenuBase.prototype.createBackground = function() {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.filters = [this._backgroundFilter];
    this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(192);
};

Scene_MenuBase.prototype.setBackgroundOpacity = function(opacity) {
    this._backgroundSprite.opacity = opacity;
};

Scene_MenuBase.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect();
    this._helpWindow = new Window_Help(rect);
    this.addWindow(this._helpWindow);
};

Scene_MenuBase.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_MenuBase.prototype.nextActor = function() {
    $gameParty.makeMenuActorNext();
    this.updateActor();
    this.onActorChange();
};

Scene_MenuBase.prototype.previousActor = function() {
    $gameParty.makeMenuActorPrevious();
    this.updateActor();
    this.onActorChange();
};

Scene_MenuBase.prototype.onActorChange = function() {
    SoundManager.playCursor();
};

