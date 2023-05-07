/*:
 * @target MZ
 * @author NotADev
 * @plugindesc All plugin commands for interacting with the engine.
 * @help
 * 
 * @command event_chase_position
 * @text Event: Chase Position
 * @desc Make an event pathfind to a position on the map (currently doesn't stop finding when goal is reached.)
 * 
 * @arg event_id
 * @type number
 * @text Event ID
 * @desc ID of the event that will do the chasing.
 * 
 * @arg target_x
 * @type number
 * @text Target X
 * @desc X position of target
 * 
 * @arg target_y
 * @type number
 * @text Target Y
 * @desc Y position of target
 * 
 */

PluginManager.registerCommand('Plugin_Commands', 'event_chase_position', args => {
    const chaser = $gameMap.event(+args.event_id);
    const x = +args.target_x;
    const y = +args.target_y;

    chaser.setTargetByPos(x, y);
    chaser.setChasing(true);
});
