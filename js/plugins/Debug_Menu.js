/*:
 * @target MZ
 * @author NotADev
 * @plugindesc Scene for controlling various debug options.
 * @help
 * 
 */

var PlaygroundPlugins = PlaygroundPlugins || {};
PlaygroundPlugins.Debug_Menu = PlaygroundPlugins.Debug_Menu || {};

//------------------
// #region Scene_Map
//------------------

Scene_Map.prototype.updateCallDebug = function() {
    if (this.isDebugCalled()) {
        SceneManager.push(Scene_Debug_Main);
    }
};

// #endregion

//------------------
// #region Scene_Debug_Main
//------------------

// Scene_Debug_Main
//
// The scene class of the debug screen.

function Scene_Debug_Main() {
    this.initialize(...arguments);
}

Scene_Debug_Main.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Debug_Main.prototype.constructor = Scene_Debug_Main;

Scene_Debug_Main.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Debug_Main.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createDebugMainWindow();
    this.createDebugCollisionsWindow();
};

Scene_Debug_Main.prototype.debugWindowsRect = function(numLines = 1) {
    const wx = 8;
    const wy = 8;
    const ww = 200;
    const wh = this.calcWindowHeight(numLines, Window_Command_Modular);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Debug_Main.prototype.createDebugMainWindow = function() {
    const commands = this.debugMainWindowCommands();
    const rect = this.debugWindowsRect(commands.length);
    this._debugMainWindow = new Window_Command_Modular(rect, commands);
    this._debugMainWindow.setHandler(commands[0], this.onCollisions.bind(this));
    this._debugMainWindow.setHandler(commands[1], this.onSwitchVars.bind(this));
    this._debugMainWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._debugMainWindow);
};

Scene_Debug_Main.prototype.debugMainWindowCommands = function() {
    return [
        'Collisions',
        'Switches & Variables',
    ];
};

Scene_Debug_Main.prototype.createDebugCollisionsWindow = function() {
    const rect = this.debugWindowsRect(Object.keys(Window_Debug_Collisions.COMMAND).length);
    this._debugCollisionsWindow = new Window_Debug_Collisions(rect);
    this._debugCollisionsWindow.setHandler("cancel", this.onCollisionsCancel.bind(this));
    this._debugCollisionsWindow.deactivate();
    this._debugCollisionsWindow.hide();
    this.addWindow(this._debugCollisionsWindow);
};

Scene_Debug_Main.prototype.onCollisions = function() {
    this._debugMainWindow.hide();
    this._debugCollisionsWindow.select(0);
    this._debugCollisionsWindow.show();
    this._debugCollisionsWindow.activate();
};

Scene_Debug_Main.prototype.onSwitchVars = function() {
    SceneManager.push(Scene_Debug);
};

Scene_Debug_Main.prototype.onCollisionsCancel = function() {
    this._debugCollisionsWindow.hide();
    this._debugMainWindow.show();
    this._debugMainWindow.activate();
};

// #endregion

//------------------
// #region Window_Debug_Collisions
//------------------

// Window_Debug_Collisions
//
// The window for changing debug collision settings.

function Window_Debug_Collisions() {
    this.initialize(...arguments);
}

Window_Debug_Collisions.COMMAND = {};
Window_Debug_Collisions.COMMAND.DRAW_COLLISION_AREA = 'Draw Collision Areas';
Window_Debug_Collisions.COMMAND.DRAW_HURTBOXES = 'Draw Hurtboxes';
Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HURTBOXES = 'Draw Inactive Hurtboxes';
Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HURTBOXES = 'Draw Active Hurtboxes';
Window_Debug_Collisions.COMMAND.DRAW_HITBOXES = 'Draw Hitboxes';
Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HITBOXES = 'Draw Inactive Hitboxes';
Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HITBOXES = 'Draw Active Hitboxes';

Window_Debug_Collisions.prototype = Object.create(Window_Options.prototype);
Window_Debug_Collisions.prototype.constructor = Window_Debug_Collisions;

Window_Debug_Collisions.prototype.initialize = function(rect) {
    Window_Options.prototype.initialize.call(this, rect);
};

Window_Debug_Collisions.prototype.makeCommandList = function() {
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_COLLISION_AREA, Window_Debug_Collisions.COMMAND.DRAW_COLLISION_AREA);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_HURTBOXES, Window_Debug_Collisions.COMMAND.DRAW_HURTBOXES);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HURTBOXES, Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HURTBOXES);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HURTBOXES, Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HURTBOXES);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_HITBOXES, Window_Debug_Collisions.COMMAND.DRAW_HITBOXES);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HITBOXES, Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HITBOXES);
    this.addCommand(Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HITBOXES, Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HITBOXES);
};

Window_Debug_Collisions.prototype.statusWidth = function() {
    return 32;
};

Window_Debug_Collisions.prototype.getConfigValue = function(symbol) {
    switch (symbol) {
        case Window_Debug_Collisions.COMMAND.DRAW_COLLISION_AREA:
            return $debugData._drawCollisionAreas;
        case Window_Debug_Collisions.COMMAND.DRAW_HURTBOXES:
            return $debugData._drawHurtBoxes;
        case Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HURTBOXES:
            return $debugData._drawInactiveHurtBoxes;
        case Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HURTBOXES:
            return $debugData._drawActiveHurtBoxes;
        case Window_Debug_Collisions.COMMAND.DRAW_HITBOXES:
            return $debugData._drawHitBoxes;
        case Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HITBOXES:
            return $debugData._drawInactiveHitBoxes;
        case Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HITBOXES:
            return $debugData._drawActiveHitBoxes;
        default:
            return true;
    }
};

Window_Debug_Collisions.prototype.setConfigValue = function(symbol, value) {
    switch (symbol) {
        case Window_Debug_Collisions.COMMAND.DRAW_COLLISION_AREA:
            $debugData._drawCollisionAreas = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_HURTBOXES:
            $debugData._drawHurtBoxes = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HURTBOXES:
            $debugData._drawInactiveHurtBoxes = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HURTBOXES:
            $debugData._drawActiveHurtBoxes = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_HITBOXES:
            $debugData._drawHitBoxes = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_INACTIVE_HITBOXES:
            $debugData._drawInactiveHitBoxes = value;
            break;
        case Window_Debug_Collisions.COMMAND.DRAW_ACTIVE_HITBOXES:
            $debugData._drawActiveHitBoxes = value;
            break;
        default:
            break;
    }
};

// #endregion