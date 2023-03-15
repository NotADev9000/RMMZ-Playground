/*:
 * @target MZ
 * @author NotADev
 * @plugindesc Holds various data for debugging
 * @help
 * 
 */

var PlaygroundPlugins = PlaygroundPlugins || {};
PlaygroundPlugins.Debug_Data = PlaygroundPlugins.Debug_Data || {};

//------------------
// #region DataManager
//------------------

$debugData = null;

PlaygroundPlugins.Debug_Data.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    PlaygroundPlugins.Debug_Data.createGameObjects.call(this);
    $debugData = new Debug_Data();
};

// #endregion

//------------------
// #region Debug_Data
//------------------

// Debug_Data
//
// The game object class for the debug data.

function Debug_Data() {
    this.initialize(...arguments);
}

Debug_Data.prototype.initialize = function() {
    this._drawCollisionAreas = true;
    this._drawHurtBoxes = true;
    this._drawInactiveHurtBoxes = true;
    this._drawActiveHurtBoxes = true;
    this._drawHitBoxes = true;
    this._drawInactiveHitBoxes = true;
    this._drawActiveHitBoxes = true;
};

// #endregion
